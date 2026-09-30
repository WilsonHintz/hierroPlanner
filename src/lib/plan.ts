import { addMinutes, format } from "date-fns";
import { es } from "date-fns/locale/es";
import {
  BUS_CLASS,
  FOOD_PER_DAY,
  TERMINAL_REMIS,
  venueById,
  type BusClass,
  type City,
  type Lodging,
  type Show,
} from "@/data/catalog";

export type Pace = "ajustado" | "holgado";

export type Leg = {
  from: string;
  to: string;
  depart: Date;
  arrive: Date;
};

export type PlanInput = {
  show: Show;
  city: City;
  lodging: Lodging;
  party: number;
  busClass: BusClass;
  pace: Pace;
  nights: number | null;
  food: boolean;
  merch: number;
  transfers: boolean;
  roundTrip: boolean;
  fareOverride: number | null;
  ticketOverride: number | null;
  lodgingOverride: number | null;
};

export type Plan = {
  nights: number;
  suggested: number;
  rooms: number;
  oneWay: number;
  days: number;
  bus: number;
  tickets: number;
  stay: number;
  transfer: number;
  meals: number;
  extras: number;
  total: number;
  perPerson: number;
  outbound: Leg | null;
  inbound: Leg | null;
  advice: string;
  dawn: boolean;
};

function at(iso: string, time: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, 0, 0);
}

function money(n: number): number {
  return Math.round(n);
}

export function formatHours(hours: number): string {
  if (hours <= 0) return "Sin micro";
  const total = Math.round(hours * 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

export function ars(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

export function people(n: number): string {
  return new Intl.NumberFormat("es-AR").format(n);
}

export function cap(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function when(date: Date, pattern: string): string {
  return format(date, pattern, { locale: es });
}

export function suggestedNights(city: City, pace: Pace): number {
  if (city.local) return pace === "holgado" ? 1 : 0;
  return pace === "holgado" ? 2 : 1;
}

function schedule(show: Show, city: City, pace: Pace): {
  outbound: Leg | null;
  inbound: Leg | null;
  advice: string;
  dawn: boolean;
} {
  if (city.local) {
    return {
      outbound: null,
      inbound: null,
      dawn: false,
      advice:
        pace === "holgado"
          ? "Sin micro. Dormís en la ciudad la noche del recital."
          : "Sin micro. Volvés a tu casa después del show: entrada, comida y remis.",
    };
  }

  const dur = Math.round(city.hours * 60);
  const showStart = at(show.date, show.doors);
  let arriveTarget: Date;
  let advice: string;

  if (pace === "holgado") {
    arriveTarget = at(show.date, "15:00");
    arriveTarget.setDate(arriveTarget.getDate() - 1);
    advice = "Llegás el día anterior. Dos noches: la previa y la del recital.";
  } else if (city.hours <= 6) {
    arriveTarget = addMinutes(showStart, -180);
    advice = "Está lo bastante cerca: salís el mismo día y dormís después del show.";
  } else {
    arriveTarget = at(show.date, "08:00");
    advice = "Micro de noche: llegás a la mañana y dormís la noche del recital.";
  }

  const depart = addMinutes(arriveTarget, -dur);
  const dawn = depart.getHours() < 6;
  if (dawn) {
    advice += " El horario modelo cae de madrugada: si no hay esa frecuencia, tomá la noche anterior.";
  }

  const back = at(show.date, city.hours >= 12 ? "12:00" : "10:30");
  back.setDate(back.getDate() + 1);

  return {
    dawn,
    advice,
    outbound: {
      from: city.terminal,
      to: "Terminal de Córdoba",
      depart,
      arrive: arriveTarget,
    },
    inbound: {
      from: "Terminal de Córdoba",
      to: city.terminal,
      depart: back,
      arrive: addMinutes(back, dur),
    },
  };
}

export function buildPlan(input: PlanInput): Plan {
  const party = Math.min(8, Math.max(1, Math.round(input.party)));
  const suggested = suggestedNights(input.city, input.pace);
  const nights = Math.min(7, Math.max(0, input.nights ?? suggested));
  const venue = venueById(input.show.venueId);
  const semicama = input.fareOverride ?? input.city.semicama;
  const oneWay = input.city.local ? 0 : money(semicama * BUS_CLASS[input.busClass].mult);
  const legs = input.roundTrip ? 2 : 1;
  const bus = oneWay * legs * (input.city.local ? 0 : party);
  const ticket = input.ticketOverride ?? input.show.ticket;
  const tickets = money(ticket) * party;
  const rate = input.lodgingOverride ?? input.lodging.rate;
  const rooms = input.lodging.unit === "bed" ? party : Math.ceil(party / input.lodging.sleeps);
  const stay = nights === 0 ? 0 : money(rate) * rooms * nights;
  const ride = (input.city.local ? 0 : TERMINAL_REMIS) + venue.remis;
  const transfer = input.transfers ? ride * 2 * party : 0;
  const days = input.city.local ? Math.max(1, nights) : nights + 1;
  const meals = input.food ? FOOD_PER_DAY * days * party : 0;
  const extras = Math.max(0, Math.round(input.merch)) * party;
  const total = bus + tickets + stay + transfer + meals + extras;
  const trip = schedule(input.show, input.city, input.pace);

  return {
    nights,
    suggested,
    rooms,
    oneWay,
    days,
    bus,
    tickets,
    stay,
    transfer,
    meals,
    extras,
    total,
    perPerson: money(total / party),
    ...trip,
  };
}

export function summaryText(input: PlanInput, plan: Plan): string {
  const venue = venueById(input.show.venueId);
  const lines = [
    "HIERRO — paquete a Córdoba",
    `${input.show.artist} · ${venue.name} · ${cap(when(at(input.show.date, input.show.doors), "EEEE d 'de' MMMM"))} · puertas ${input.show.doors}`,
    `Desde ${input.city.name} · ${input.party} ${input.party === 1 ? "persona" : "personas"} · ${BUS_CLASS[input.busClass].label}${input.roundTrip ? " · ida y vuelta" : " · solo ida"}`,
  ];
  if (plan.outbound) {
    lines.push(
      `Ida: ${cap(when(plan.outbound.depart, "EEE d MMM HH:mm"))} ${plan.outbound.from} → ${cap(when(plan.outbound.arrive, "EEE d MMM HH:mm"))} ${plan.outbound.to}`,
    );
  }
  if (plan.inbound && input.roundTrip) {
    lines.push(
      `Vuelta: ${cap(when(plan.inbound.depart, "EEE d MMM HH:mm"))} ${plan.inbound.from} → ${cap(when(plan.inbound.arrive, "EEE d MMM HH:mm"))} ${plan.inbound.to}`,
    );
  }
  lines.push(
    `${plan.nights} ${plan.nights === 1 ? "noche" : "noches"} · ${input.lodging.name}`,
    "",
    `Pasajes ${ars(plan.bus)}`,
    `Entradas ${ars(plan.tickets)}`,
    `Alojamiento ${ars(plan.stay)}`,
    `Traslados ${ars(plan.transfer)}`,
    `Comida ${ars(plan.meals)}`,
    `Merch y extras ${ars(plan.extras)}`,
    `TOTAL ${ars(plan.total)}`,
    `Por persona ${ars(plan.perPerson)}`,
    "",
    "Tarifas de referencia, septiembre 2026. Confirmá en la empresa antes de comprar. No es una boletería.",
  );
  return lines.join("\n");
}

const SHOW_HOURS = 3;

export type TimelineKind = "bus" | "show" | "stay";

export type TimelineSegment = {
  id: string;
  kind: TimelineKind;
  label: string;
  detail: string;
  start: Date;
  end: Date;
};

export type TimelineDay = {
  index: number;
  date: Date;
  weekday: string;
};

export type TripTimeline = {
  days: TimelineDay[];
  segments: TimelineSegment[];
  caption: string;
};

function dayStart(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function dayShift(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

function spanLabel(ms: number): string {
  const total = Math.max(0, Math.round(ms / 60000));
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h <= 0) return `${m} min`;
  return m ? `${h} h ${m}` : `${h} h`;
}

function sleepWindow(evening: Date, showStart: Date, showEnd: Date): { start: Date; end: Date } {
  let start = new Date(evening);
  start.setHours(23, 0, 0, 0);
  const end = dayShift(evening, 1);
  end.setHours(8, 0, 0, 0);
  if (dayStart(evening).getTime() === dayStart(showStart).getTime() && start.getTime() < showEnd.getTime()) {
    start = new Date(showEnd);
  }
  if (start.getTime() >= end.getTime()) end.setTime(start.getTime() + 3 * 60 * 60 * 1000);
  return { start, end };
}

function nightsBefore(arrival: Date | null, showStart: Date, local: boolean, pace: Pace): Date[] {
  const showDay = dayStart(showStart);
  if (local) return pace === "holgado" ? [dayShift(showDay, -1)] : [];
  if (!arrival) return [];
  let cursor = dayStart(arrival);
  if (arrival.getHours() >= 23) cursor = dayShift(cursor, 1);
  const dates: Date[] = [];
  while (cursor.getTime() < showDay.getTime()) {
    dates.push(cursor);
    cursor = dayShift(cursor, 1);
  }
  return dates;
}

function stayEvenings(
  nights: number,
  showStart: Date,
  arrival: Date | null,
  local: boolean,
  pace: Pace,
): Date[] {
  if (nights <= 0) return [];
  const showDay = dayStart(showStart);
  const before = nightsBefore(arrival, showStart, local, pace);
  const chosen = [showDay];
  let left = nights - 1;
  for (let i = before.length - 1; i >= 0 && left > 0; i -= 1) {
    chosen.push(before[i]);
    left -= 1;
  }
  let extra = 1;
  while (left > 0) {
    chosen.push(dayShift(showDay, extra));
    extra += 1;
    left -= 1;
  }
  return chosen.sort((a, b) => a.getTime() - b.getTime());
}

export function buildTimeline(
  show: Show,
  plan: Pick<Plan, "outbound" | "inbound" | "nights">,
  options: { roundTrip: boolean; local: boolean; pace: Pace },
): TripTimeline {
  const showStart = at(show.date, show.doors || "21:00");
  const showEnd = addMinutes(showStart, SHOW_HOURS * 60);
  const segments: TimelineSegment[] = [];

  if (!options.local && plan.outbound) {
    const hours = spanLabel(plan.outbound.arrive.getTime() - plan.outbound.depart.getTime());
    segments.push({
      id: "ida",
      kind: "bus",
      label: "Ida",
      detail: `Salida ${cap(when(plan.outbound.depart, "EEE HH:mm"))} · ${hours} hasta ${cap(when(plan.outbound.arrive, "EEE HH:mm"))}`,
      start: plan.outbound.depart,
      end: plan.outbound.arrive,
    });
  }

  segments.push({
    id: "show",
    kind: "show",
    label: "Recital",
    detail: `Puertas ${cap(when(showStart, "EEE HH:mm"))} · unas ${SHOW_HOURS} h, hasta ${cap(when(showEnd, "HH:mm"))}`,
    start: showStart,
    end: showEnd,
  });

  if (!options.local && options.roundTrip && plan.inbound) {
    const hours = spanLabel(plan.inbound.arrive.getTime() - plan.inbound.depart.getTime());
    segments.push({
      id: "vuelta",
      kind: "bus",
      label: "Vuelta",
      detail: `Salida ${cap(when(plan.inbound.depart, "EEE HH:mm"))} · ${hours} hasta ${cap(when(plan.inbound.arrive, "EEE HH:mm"))}`,
      start: plan.inbound.depart,
      end: plan.inbound.arrive,
    });
  }

  const showDay = dayStart(showStart);
  const evenings = stayEvenings(
    plan.nights,
    showStart,
    plan.outbound?.arrive ?? null,
    options.local,
    options.pace,
  );
  let hasBefore = false;
  let hasAfter = false;
  evenings.forEach((evening, index) => {
    const before = evening.getTime() < showDay.getTime();
    if (before) hasBefore = true;
    else hasAfter = true;
    const sleep = sleepWindow(evening, showStart, showEnd);
    const label = before ? "Antes" : "Después";
    segments.push({
      id: `stay-${index}`,
      kind: "stay",
      label,
      detail: `Dormís ${before ? "antes" : "después"} del recital · ${cap(when(sleep.start, "EEE HH:mm"))} – ${cap(when(sleep.end, "EEE HH:mm"))}`,
      start: sleep.start,
      end: sleep.end,
    });
  });

  let minT = showStart.getTime();
  let maxT = showEnd.getTime();
  for (const seg of segments) {
    minT = Math.min(minT, seg.start.getTime());
    maxT = Math.max(maxT, seg.end.getTime());
  }
  const first = dayStart(new Date(minT));
  let last = dayStart(new Date(maxT));
  if (maxT === last.getTime()) last = dayShift(last, -1);
  if (last.getTime() < first.getTime()) last = first;

  const days: TimelineDay[] = [];
  for (
    let date = first, index = 1;
    date.getTime() <= last.getTime() && index <= 12;
    date = dayShift(date, 1), index += 1
  ) {
    days.push({
      index,
      date,
      weekday: cap(when(date, "EEE d")),
    });
  }

  const parts: string[] = [];
  if (!options.local && plan.outbound) {
    parts.push(
      `Salís ${cap(when(plan.outbound.depart, "EEE HH:mm"))} · ${spanLabel(plan.outbound.arrive.getTime() - plan.outbound.depart.getTime())} de micro`,
    );
  } else {
    parts.push("Sin micro");
  }
  parts.push(`recital ${cap(when(showStart, "EEE HH:mm"))} · unas ${SHOW_HOURS} h`);
  if (!options.local && options.roundTrip && plan.inbound) {
    parts.push(`volvés ${cap(when(plan.inbound.depart, "EEE HH:mm"))}`);
  } else if (!options.local) {
    parts.push("sin vuelta");
  }
  if (plan.nights <= 0) parts.push("sin estadía");
  else if (hasBefore && hasAfter) parts.push("dormís antes y después");
  else if (hasBefore) parts.push("dormís antes del recital");
  else parts.push("dormís después del recital");

  return { days, segments, caption: parts.join(" · ") };
}
