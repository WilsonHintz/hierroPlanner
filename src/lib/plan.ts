import { addMinutes, format } from "date-fns";
import { es } from "date-fns/locale";
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
