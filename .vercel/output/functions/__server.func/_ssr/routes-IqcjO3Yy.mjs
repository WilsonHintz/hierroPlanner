import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Minus, c as Copy, d as Bus, f as BedDouble, i as Plus, l as Clock, o as MapPin, r as Trash2, s as Hexagon, t as Users, u as Check } from "../_libs/lucide-react.mjs";
import { n as format, r as addMinutes, t as es } from "../_libs/date-fns.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-IqcjO3Yy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FOOD_PER_DAY = 16e3;
var TERMINAL_REMIS = 6500;
var VENUES = [
	{
		id: "paraguay",
		name: "Club Paraguay",
		barrio: "Centro",
		remis: 4500,
		walkable: true,
		note: "A unas 20 cuadras de la terminal. De noche, mejor remis."
	},
	{
		id: "plaza",
		name: "Plaza de la Música",
		barrio: "Parque Sarmiento",
		remis: 7e3,
		walkable: false,
		note: "Sobre el parque. Remis corto desde Nueva Córdoba."
	},
	{
		id: "quality",
		name: "Quality Espacio",
		barrio: "Chateau Carreras",
		remis: 14e3,
		walkable: false,
		note: "Lejos del centro. Calculá remis o taxi sí o sí."
	},
	{
		id: "libertador",
		name: "Teatro del Libertador",
		barrio: "Centro",
		remis: 4e3,
		walkable: true,
		note: "Plaza San Martín. Butacas: llegá antes de que cierren puertas."
	},
	{
		id: "orfeo",
		name: "Orfeo Superdomo",
		barrio: "Ferreyra",
		remis: 12e3,
		walkable: false,
		note: "Sobre circunvalación. Sin colectivo cómodo a la salida."
	}
];
var CITIES = [
	{
		rank: 1,
		id: "amba",
		name: "Gran Buenos Aires (AMBA)",
		short: "AMBA",
		provinces: "CABA y Prov. de Buenos Aires",
		population: 15291277,
		hours: 9.5,
		semicama: 38e3,
		terminal: "Retiro",
		empresas: [
			"Flecha Bus",
			"Chevallier",
			"Sierras de Córdoba",
			"Gral. Urquiza"
		],
		note: "El corredor con más frecuencias. El expreso puede bajar de 9 h."
	},
	{
		rank: 2,
		id: "cba",
		name: "Gran Córdoba",
		short: "Córdoba",
		provinces: "Córdoba",
		population: 1705741,
		local: true,
		hours: 0,
		semicama: 0,
		terminal: "Sin micro",
		empresas: [],
		note: "El recital es en tu ciudad. El paquete es entrada, cama y remis."
	},
	{
		rank: 3,
		id: "rosario",
		name: "Gran Rosario",
		short: "Rosario",
		provinces: "Santa Fe",
		population: 1455292,
		hours: 4.5,
		semicama: 22e3,
		terminal: "Terminal de Rosario",
		empresas: [
			"Flecha Bus",
			"El Práctico",
			"Sierras de Córdoba"
		],
		note: "El salto más corto fuera de Córdoba. Da para ir y volver el finde."
	},
	{
		rank: 4,
		id: "mendoza",
		name: "Gran Mendoza",
		short: "Mendoza",
		provinces: "Mendoza",
		population: 1066893,
		hours: 9,
		semicama: 4e4,
		terminal: "Terminal de Mendoza",
		empresas: [
			"Andesmar",
			"CATA",
			"Chevallier"
		],
		note: "Cruces de noche por San Luis. La cama se nota."
	},
	{
		rank: 5,
		id: "tucuman",
		name: "Gran San Miguel de Tucumán",
		short: "Tucumán",
		provinces: "Tucumán",
		population: 1052194,
		hours: 8,
		semicama: 34e3,
		terminal: "Terminal de Tucumán",
		empresas: [
			"La Veloz del Norte",
			"Flecha Bus",
			"Aconquija"
		],
		note: "Ocho horas clavadas. Llegar a la mañana del show alcanza."
	},
	{
		rank: 6,
		id: "laplata",
		name: "Gran La Plata",
		short: "La Plata",
		provinces: "Provincia de Buenos Aires",
		population: 933474,
		hours: 11,
		semicama: 44e3,
		terminal: "Terminal de La Plata",
		empresas: ["El Turista", "Plata Bus"],
		note: "Hay pocas directas. A veces combina en Buenos Aires y se estira."
	},
	{
		rank: 7,
		id: "salta",
		name: "Gran Salta",
		short: "Salta",
		provinces: "Salta",
		population: 671015,
		hours: 12,
		semicama: 52e3,
		terminal: "Terminal de Salta",
		empresas: ["La Veloz del Norte", "Flecha Bus"],
		note: "Viaje largo. Conviene llegar el día anterior."
	},
	{
		rank: 8,
		id: "mdq",
		name: "Mar del Plata",
		short: "Mar del Plata",
		provinces: "Provincia de Buenos Aires",
		population: 644234,
		hours: 14.5,
		semicama: 58e3,
		terminal: "Terminal de Mar del Plata",
		empresas: ["Flecha Bus", "Plusmar"],
		note: "Muchas frecuencias pasan por Buenos Aires. No lo subestimes."
	},
	{
		rank: 9,
		id: "neuquen",
		name: "Gran Neuquén",
		short: "Neuquén",
		provinces: "Neuquén y Río Negro",
		population: 551988,
		hours: 14,
		semicama: 6e4,
		terminal: "Terminal de Neuquén",
		empresas: ["Vía Bariloche", "Andesmar"],
		note: "Una de las rutas más caras del ranking. La suite vale si podés."
	},
	{
		rank: 10,
		id: "sanjuan",
		name: "Gran San Juan",
		short: "San Juan",
		provinces: "San Juan",
		population: 546613,
		hours: 8.5,
		semicama: 36e3,
		terminal: "Terminal de San Juan",
		empresas: ["CATA", "Andesmar"],
		note: "Sale de noche y amanece en Córdoba. Similar a Mendoza, un poco más corto."
	}
];
var LODGINGS = [
	{
		id: "hostel",
		name: "Hostel en Nueva Córdoba",
		detail: "Cama en compartida, a cuadras de la terminal.",
		rate: 18e3,
		unit: "bed",
		sleeps: 1
	},
	{
		id: "centro",
		name: "Hotel simple en Centro",
		detail: "Doble. Caminable a Paraguay y al Libertador.",
		rate: 55e3,
		unit: "room",
		sleeps: 2
	},
	{
		id: "nc",
		name: "Hotel en Nueva Córdoba",
		detail: "La base de siempre: terminal, bares y el parque cerca.",
		rate: 89e3,
		unit: "room",
		sleeps: 2
	},
	{
		id: "guemes",
		name: "Depto en Güemes",
		detail: "Hasta 3 personas, cocina y el after a pie.",
		rate: 13e4,
		unit: "room",
		sleeps: 3
	}
];
var SHOWS = [
	{
		id: "carajo",
		artist: "Carajo",
		bill: "Show de club",
		date: "2026-10-31",
		doors: "21:00",
		venueId: "paraguay",
		genre: "Groove",
		ticket: 22e3
	},
	{
		id: "lorihen",
		artist: "Lörihen + Tren Loco",
		bill: "Doble de heavy nacional",
		date: "2026-11-06",
		doors: "21:00",
		venueId: "paraguay",
		genre: "Heavy",
		ticket: 18e3
	},
	{
		id: "oconnor",
		artist: "O'Connor",
		bill: "Heavy rock",
		date: "2026-11-13",
		doors: "21:00",
		venueId: "plaza",
		genre: "Heavy",
		ticket: 3e4
	},
	{
		id: "malon",
		artist: "Malón",
		bill: "Thrash, el legado",
		date: "2026-11-14",
		doors: "21:00",
		venueId: "plaza",
		genre: "Thrash",
		ticket: 28e3
	},
	{
		id: "horcas",
		artist: "Horcas",
		bill: "Heavy en espacio grande",
		date: "2026-11-21",
		doors: "21:00",
		venueId: "quality",
		genre: "Heavy",
		ticket: 35e3
	},
	{
		id: "animal",
		artist: "A.N.I.M.A.L.",
		bill: "Groove / metal",
		date: "2026-11-28",
		doors: "21:00",
		venueId: "quality",
		genre: "Groove",
		ticket: 42e3
	},
	{
		id: "rata",
		artist: "Rata Blanca",
		bill: "Butacas en el Libertador",
		date: "2026-12-04",
		doors: "20:30",
		venueId: "libertador",
		genre: "Power",
		ticket: 48e3
	},
	{
		id: "feria",
		artist: "Feria del Hierro",
		bill: "Mastifal, Tren Loco y escena local",
		date: "2026-12-12",
		doors: "18:00",
		venueId: "orfeo",
		genre: "Festival",
		ticket: 26e3
	}
];
var BUS_CLASS = {
	semicama: {
		id: "semicama",
		label: "Semicama",
		mult: 1,
		hint: "Butaca reclinable"
	},
	cama: {
		id: "cama",
		label: "Cama",
		mult: 1.36,
		hint: "Mejor de 8 h en adelante"
	},
	suite: {
		id: "suite",
		label: "Cama suite",
		mult: 1.8,
		hint: "Premium, si el cuerpo pide"
	}
};
var HEAT_LEGEND = [
	{
		id: "h1",
		range: "1 – 20",
		box: "bg-heat-1",
		ink: "text-rust-ink"
	},
	{
		id: "h2",
		range: "20 – 50",
		box: "bg-heat-2",
		ink: "text-rust-ink"
	},
	{
		id: "h3",
		range: "50 – 1000",
		box: "bg-heat-3",
		ink: "text-rust-ink"
	},
	{
		id: "h4",
		range: "1000 – 8000",
		box: "bg-heat-4",
		ink: "text-rust-ink"
	},
	{
		id: "h5",
		range: "8000 – 20000",
		box: "bg-heat-5",
		ink: "text-fg"
	}
];
var RANK_TONE = [
	{
		box: "bg-heat-1",
		ink: "text-rust-ink"
	},
	{
		box: "bg-heat-2",
		ink: "text-rust-ink"
	},
	{
		box: "bg-heat-3",
		ink: "text-rust-ink"
	},
	{
		box: "bg-heat-4",
		ink: "text-rust-ink"
	},
	{
		box: "bg-heat-5",
		ink: "text-fg"
	}
];
function rankTone(rank) {
	return RANK_TONE[Math.max(0, Math.min(4, 5 - Math.ceil(rank / 2)))];
}
function venueById(id) {
	return VENUES.find((v) => v.id === id) ?? VENUES[0];
}
function at(iso, time) {
	const [y, m, d] = iso.split("-").map(Number);
	const [hh, mm] = time.split(":").map(Number);
	return new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, 0, 0);
}
function money(n) {
	return Math.round(n);
}
function formatHours(hours) {
	if (hours <= 0) return "Sin micro";
	const total = Math.round(hours * 60);
	const h = Math.floor(total / 60);
	const m = total % 60;
	return m ? `${h} h ${m} min` : `${h} h`;
}
function ars(n) {
	return new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
		maximumFractionDigits: 0
	}).format(Math.round(n));
}
function people(n) {
	return new Intl.NumberFormat("es-AR").format(n);
}
function cap(s) {
	if (!s) return s;
	return s.charAt(0).toUpperCase() + s.slice(1);
}
function when(date, pattern) {
	return format(date, pattern, { locale: es });
}
function suggestedNights(city, pace) {
	if (city.local) return pace === "holgado" ? 1 : 0;
	return pace === "holgado" ? 2 : 1;
}
function schedule(show, city, pace) {
	if (city.local) return {
		outbound: null,
		inbound: null,
		dawn: false,
		advice: pace === "holgado" ? "Sin micro. Dormís en la ciudad la noche del recital." : "Sin micro. Volvés a tu casa después del show: entrada, comida y remis."
	};
	const dur = Math.round(city.hours * 60);
	const showStart = at(show.date, show.doors);
	let arriveTarget;
	let advice;
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
	if (dawn) advice += " El horario modelo cae de madrugada: si no hay esa frecuencia, tomá la noche anterior.";
	const back = at(show.date, city.hours >= 12 ? "12:00" : "10:30");
	back.setDate(back.getDate() + 1);
	return {
		dawn,
		advice,
		outbound: {
			from: city.terminal,
			to: "Terminal de Córdoba",
			depart,
			arrive: arriveTarget
		},
		inbound: {
			from: "Terminal de Córdoba",
			to: city.terminal,
			depart: back,
			arrive: addMinutes(back, dur)
		}
	};
}
function buildPlan(input) {
	const party = Math.min(8, Math.max(1, Math.round(input.party)));
	const suggested = suggestedNights(input.city, input.pace);
	const nights = Math.min(7, Math.max(0, input.nights ?? suggested));
	const venue = venueById(input.show.venueId);
	const semicama = input.fareOverride ?? input.city.semicama;
	const oneWay = input.city.local ? 0 : money(semicama * BUS_CLASS[input.busClass].mult);
	const bus = oneWay * (input.roundTrip ? 2 : 1) * (input.city.local ? 0 : party);
	const tickets = money(input.ticketOverride ?? input.show.ticket) * party;
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
		...trip
	};
}
function summaryText(input, plan) {
	const venue = venueById(input.show.venueId);
	const lines = [
		"HIERRO — paquete a Córdoba",
		`${input.show.artist} · ${venue.name} · ${cap(when(at(input.show.date, input.show.doors), "EEEE d 'de' MMMM"))} · puertas ${input.show.doors}`,
		`Desde ${input.city.name} · ${input.party} ${input.party === 1 ? "persona" : "personas"} · ${BUS_CLASS[input.busClass].label}${input.roundTrip ? " · ida y vuelta" : " · solo ida"}`
	];
	if (plan.outbound) lines.push(`Ida: ${cap(when(plan.outbound.depart, "EEE d MMM HH:mm"))} ${plan.outbound.from} → ${cap(when(plan.outbound.arrive, "EEE d MMM HH:mm"))} ${plan.outbound.to}`);
	if (plan.inbound && input.roundTrip) lines.push(`Vuelta: ${cap(when(plan.inbound.depart, "EEE d MMM HH:mm"))} ${plan.inbound.from} → ${cap(when(plan.inbound.arrive, "EEE d MMM HH:mm"))} ${plan.inbound.to}`);
	lines.push(`${plan.nights} ${plan.nights === 1 ? "noche" : "noches"} · ${input.lodging.name}`, "", `Pasajes ${ars(plan.bus)}`, `Entradas ${ars(plan.tickets)}`, `Alojamiento ${ars(plan.stay)}`, `Traslados ${ars(plan.transfer)}`, `Comida ${ars(plan.meals)}`, `Merch y extras ${ars(plan.extras)}`, `TOTAL ${ars(plan.total)}`, `Por persona ${ars(plan.perPerson)}`, "", "Tarifas de referencia, septiembre 2026. Confirmá en la empresa antes de comprar. No es una boletería.");
	return lines.join("\n");
}
var initialDraft = {
	showId: "malon",
	cityId: "amba",
	party: 2,
	busClass: "cama",
	pace: "ajustado",
	nights: null,
	lodgingId: "nc",
	food: true,
	merch: 0,
	transfers: true,
	roundTrip: true,
	fareOverride: null,
	ticketOverride: null,
	lodgingOverride: null,
	label: ""
};
function clampDraft(draft) {
	return {
		...draft,
		party: Math.min(8, Math.max(1, Math.round(draft.party) || 1)),
		nights: draft.nights === null ? null : Math.min(7, Math.max(0, Math.round(draft.nights))),
		merch: Math.max(0, Math.round(draft.merch) || 0)
	};
}
var useHierro = create()(persist((set, get) => ({
	draft: initialDraft,
	customShows: [],
	saved: [],
	setDraft: (patch) => set((state) => {
		const next = {
			...state.draft,
			...patch
		};
		if (patch.cityId && patch.cityId !== state.draft.cityId && patch.fareOverride === void 0) {
			next.fareOverride = null;
			if (patch.nights === void 0) next.nights = null;
		}
		if (patch.showId && patch.showId !== state.draft.showId && patch.ticketOverride === void 0) {
			next.ticketOverride = null;
			if (patch.nights === void 0) next.nights = null;
		}
		if (patch.pace && patch.pace !== state.draft.pace && patch.nights === void 0) next.nights = null;
		if (patch.lodgingId && patch.lodgingId !== state.draft.lodgingId && patch.lodgingOverride === void 0) next.lodgingOverride = null;
		return { draft: clampDraft(next) };
	}),
	addShow: (show) => set((state) => ({ customShows: [...state.customShows, show] })),
	removeShow: (id) => set((state) => ({
		customShows: state.customShows.filter((s) => s.id !== id),
		draft: state.draft.showId === id ? {
			...state.draft,
			showId: "malon"
		} : state.draft
	})),
	save: () => {
		const draft = get().draft;
		const item = {
			id: crypto.randomUUID(),
			savedAt: Date.now(),
			draft: { ...draft }
		};
		set((state) => ({ saved: [item, ...state.saved].slice(0, 8) }));
	},
	removeSaved: (id) => set((state) => ({ saved: state.saved.filter((s) => s.id !== id) })),
	load: (draft) => set({ draft: clampDraft(draft) })
}), {
	name: "hierro-v1",
	skipHydration: true,
	partialize: (state) => ({
		draft: state.draft,
		customShows: state.customShows,
		saved: state.saved
	})
}));
var field = "h-11 w-full rounded-lg border border-line bg-bg px-3 text-base text-fg outline-none";
function allShows(custom) {
	return [...SHOWS, ...custom].sort((a, b) => a.date.localeCompare(b.date));
}
function resolveDraft(draft, custom) {
	const shows = allShows(custom);
	const show = shows.find((s) => s.id === draft.showId) ?? shows[0];
	const city = CITIES.find((c) => c.id === draft.cityId) ?? CITIES[0];
	const lodging = LODGINGS.find((l) => l.id === draft.lodgingId) ?? LODGINGS[2];
	const input = {
		show,
		city,
		lodging,
		party: draft.party,
		busClass: draft.busClass,
		pace: draft.pace,
		nights: draft.nights,
		food: draft.food,
		merch: draft.merch,
		transfers: draft.transfers,
		roundTrip: draft.roundTrip,
		fareOverride: draft.fareOverride,
		ticketOverride: draft.ticketOverride,
		lodgingOverride: draft.lodgingOverride
	};
	return {
		shows,
		show,
		city,
		lodging,
		input,
		plan: buildPlan(input)
	};
}
function HierroApp() {
	const draft = useHierro((s) => s.draft);
	const setDraft = useHierro((s) => s.setDraft);
	const customShows = useHierro((s) => s.customShows);
	const saved = useHierro((s) => s.saved);
	const save = useHierro((s) => s.save);
	const removeSaved = useHierro((s) => s.removeSaved);
	const load = useHierro((s) => s.load);
	const addShow = useHierro((s) => s.addShow);
	const removeShow = useHierro((s) => s.removeShow);
	(0, import_react.useEffect)(() => {
		Promise.resolve(useHierro.persist.rehydrate()).catch(() => void 0);
	}, []);
	const { shows, show, city, lodging, input, plan } = resolveDraft(draft, customShows);
	const venue = venueById(show.venueId);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [manual, setManual] = (0, import_react.useState)(false);
	const text = (0, import_react.useMemo)(() => summaryText(input, plan), [input, plan]);
	const neighbor = shows.find((s) => {
		if (s.id === show.id) return false;
		const delta = Math.abs(Date.parse(s.date) - Date.parse(show.date));
		return delta > 0 && delta <= 1728e5;
	});
	const compared = CITIES.map((c) => {
		const alt = buildPlan({
			...input,
			city: c,
			fareOverride: c.id === city.id ? draft.fareOverride : null
		});
		return {
			city: c,
			total: alt.total,
			per: alt.perPerson
		};
	}).sort((a, b) => a.total - b.total);
	const max = compared[compared.length - 1]?.total || 1;
	async function copySummary() {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setManual(false);
			window.setTimeout(() => setCopied(false), 2e3);
		} catch {
			setManual(true);
			setCopied(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-w-0 max-w-6xl overflow-x-clip px-4 pb-24 pt-6 sm:px-6 sm:pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "grid gap-6 border-b border-line pb-6 lg:grid-cols-2 lg:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 text-sm font-semibold tracking-wide text-rust",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hexagon, {
							className: "size-4",
							"aria-hidden": "true"
						}), "Planificador · no es boletería"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-poster text-5xl tracking-wide text-fg sm:text-6xl",
						children: "HIERRO"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-lg text-fg",
						children: "Pasajes de colectivo y estadía a Córdoba para recitales de heavy metal, saliendo de las 10 áreas urbanas más pobladas del país."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 max-w-xl text-muted",
						children: [
							"Censo 2022. Tarifas de referencia de septiembre de 2026: el semicama Buenos Aires–Córdoba arranca cerca de ",
							ars(38e3),
							". Ajustalas antes de comprar."
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-card border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-fg",
							children: "Cantidad de habitantes en hexágonos regulares de 600m de lado"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 grid gap-1.5",
							children: HEAT_LEGEND.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2 text-sm text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `size-3.5 shrink-0 rounded-sm ${row.box}`,
									"aria-hidden": "true"
								}), row.range]
							}, row.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-faint",
							children: "En el mapa, el rojo es más gente por hexágono. Acá el mismo calor marca las áreas de donde sale la demanda."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				"aria-labelledby": "cartelera",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "cartelera",
							className: "font-poster text-2xl tracking-wide",
							children: "Cartelera modelo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-faint",
							children: "Octubre – diciembre 2026"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex max-w-full gap-3 overflow-x-auto pb-2",
						children: shows.map((item) => {
							const v = venueById(item.venueId);
							const on = item.id === show.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setDraft({ showId: item.id }),
								"aria-pressed": on,
								className: `flex w-64 shrink-0 flex-col rounded-card border p-4 text-left ${on ? "border-rust bg-surface" : "border-line bg-surface hover:border-faint"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm font-semibold text-rust",
										children: [
											cap(when(/* @__PURE__ */ new Date(item.date + "T12:00:00"), "EEE d MMM")),
											" · ",
											item.genre
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 font-poster text-2xl tracking-wide text-fg",
										children: item.artist
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 text-sm text-muted",
										children: item.bill
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-3 flex items-center gap-1.5 text-sm text-fg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
											className: "size-3.5 text-faint",
											"aria-hidden": "true"
										}), v.name]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-auto pt-3 font-poster text-xl tracking-wide text-fg",
										children: ars(item.id === show.id && draft.ticketOverride !== null ? draft.ticketOverride : item.ticket)
									})
								]
							}, item.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomShow, { onCreate: (item) => {
						addShow(item);
						setDraft({ showId: item.id });
					} })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid min-w-0 items-start gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "order-2 min-w-0 lg:order-1",
					"aria-labelledby": "origenes",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "origenes",
							className: "font-poster text-2xl tracking-wide",
							children: "Desde dónde salís"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-sm text-muted",
							children: "Puesto, población del censo y semicama de ida."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "grid gap-2",
							children: CITIES.map((item) => {
								const on = item.id === city.id;
								const tone = rankTone(item.rank);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"aria-pressed": on,
									onClick: () => setDraft({ cityId: item.id }),
									className: `flex w-full items-center gap-3 rounded-card border px-3 py-2.5 text-left ${on ? "border-rust bg-surface" : "border-line bg-surface/40 hover:border-faint"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `grid size-9 shrink-0 place-items-center rounded-md font-poster text-lg ${tone.box} ${tone.ink}`,
											children: item.rank
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate font-semibold text-fg",
												children: item.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "block truncate text-sm text-muted",
												children: [
													item.provinces,
													" · ",
													people(item.population)
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "shrink-0 text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-sm font-semibold text-fg",
												children: formatHours(item.hours)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-sm text-muted",
												children: item.local ? "local" : ars(item.id === city.id && draft.fareOverride !== null ? draft.fareOverride : item.semicama)
											})]
										})
									]
								}) }, item.id);
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "order-1 min-w-0 rounded-card border border-line bg-surface lg:order-2",
					"aria-labelledby": "paquete",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky top-0 z-10 rounded-t-card border-b border-line bg-surface/95 px-4 py-3 backdrop-blur sm:px-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									"Total del grupo · ",
									draft.party,
									" personas"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-poster text-4xl tracking-wide text-fg sm:text-5xl",
								"aria-live": "polite",
								children: ars(plan.total)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted",
								children: [ars(plan.perPerson), " por persona"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 px-4 py-5 sm:px-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: "paquete",
									className: "font-poster text-3xl tracking-wide",
									children: show.artist
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-muted",
									children: [
										cap(when(/* @__PURE__ */ new Date(show.date + "T12:00:00"), "EEEE d 'de' MMMM")),
										" · puertas ",
										show.doors,
										" ·",
										" ",
										venue.name,
										", ",
										venue.barrio
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-faint",
									children: venue.note
								}),
								show.custom ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => removeShow(show.id),
									className: "mt-2 text-sm font-semibold text-heat-5",
									children: "Quitar este recital cargado"
								}) : null,
								neighbor ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 rounded-lg bg-bg px-3 py-2 text-sm text-muted",
									children: [
										"Cerca en el calendario: ",
										neighbor.artist,
										" (",
										cap(when(/* @__PURE__ */ new Date(neighbor.date + "T12:00:00"), "EEE d MMM")),
										").",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "font-semibold text-rust",
											onClick: () => setDraft({ showId: neighbor.id }),
											children: "Ver ese recital"
										})
									]
								}) : null
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
								children: "Personas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
								value: draft.party,
								min: 1,
								max: 8,
								onChange: (party) => setDraft({ party }),
								label: "personas"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", {
									className: "mb-2 flex items-center gap-2 text-sm font-semibold text-fg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bus, {
										className: "size-4 text-rust",
										"aria-hidden": "true"
									}), "Categoría del micro"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-2",
									children: Object.keys(BUS_CLASS).map((id) => {
										const item = BUS_CLASS[id];
										const on = draft.busClass === id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											"aria-pressed": on,
											disabled: !!city.local,
											onClick: () => setDraft({ busClass: id }),
											className: `min-h-11 rounded-lg border px-2 py-2 text-left ${on ? "border-rust bg-rust text-rust-ink" : "border-line bg-bg text-fg"} disabled:opacity-40`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-sm font-semibold",
												children: item.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `block text-xs ${on ? "opacity-80" : "text-muted"}`,
												children: item.hint
											})]
										}, id);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "mt-3 flex min-h-11 items-center gap-2 text-sm text-fg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: draft.roundTrip,
										disabled: !!city.local,
										onChange: (e) => setDraft({ roundTrip: e.target.checked }),
										className: "size-4 accent-rust"
									}), "Ida y vuelta"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: city.note
								}),
								city.empresas.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-faint",
									children: [
										"Empresas habituales: ",
										city.empresas.join(", "),
										"."
									]
								}) : null
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", {
									className: "mb-2 flex items-center gap-2 text-sm font-semibold text-fg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
										className: "size-4 text-rust",
										"aria-hidden": "true"
									}), "Cómo viajar"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [[
										"ajustado",
										"Ajustado",
										"Llegar y ver el show"
									], [
										"holgado",
										"Holgado",
										"Un día antes en la ciudad"
									]].map(([id, title, hint]) => {
										const on = draft.pace === id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											"aria-pressed": on,
											onClick: () => setDraft({ pace: id }),
											className: `min-h-11 rounded-lg border px-3 py-2 text-left ${on ? "border-rust bg-rust text-rust-ink" : "border-line bg-bg text-fg"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-sm font-semibold",
												children: title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `block text-xs ${on ? "opacity-80" : "text-muted"}`,
												children: hint
											})]
										}, id);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-fg",
									children: plan.advice
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Itinerary, {
									plan,
									roundTrip: draft.roundTrip,
									local: !!city.local
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BedDouble, { className: "size-4" }),
									children: ["Noches", draft.nights === null ? " · sugeridas" : ""]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
										value: plan.nights,
										min: 0,
										max: 7,
										onChange: (nights) => setDraft({ nights }),
										label: "noches"
									}), draft.nights !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setDraft({ nights: null }),
										className: "min-h-11 rounded-lg border border-line px-3 text-sm font-semibold text-fg",
										children: [
											"Usar sugeridas (",
											plan.suggested,
											")"
										]
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 grid gap-2",
									children: LODGINGS.map((item) => {
										const on = item.id === lodging.id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											"aria-pressed": on,
											onClick: () => setDraft({ lodgingId: item.id }),
											className: `rounded-lg border px-3 py-2 text-left ${on ? "border-rust bg-bg" : "border-line"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-baseline justify-between gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-fg",
													children: item.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "shrink-0 text-sm text-muted",
													children: ars(item.id === lodging.id && draft.lodgingOverride !== null ? draft.lodgingOverride : item.rate)
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-sm text-muted",
												children: item.detail
											})]
										}, item.id);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-faint",
									children: [lodging.unit === "bed" ? `${plan.rooms} ${plan.rooms === 1 ? "cama" : "camas"}` : `${plan.rooms} ${plan.rooms === 1 ? "habitación" : "habitaciones"} para ${draft.party}`, ". Si las noches son 0, no se cobra estadía."]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-start gap-3 py-2 text-sm text-fg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0 flex-1",
											children: [
												"Comida · ",
												ars(FOOD_PER_DAY),
												" por persona por día (",
												plan.days,
												" ",
												plan.days === 1 ? "día" : "días",
												")"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: draft.food,
											onChange: (e) => setDraft({ food: e.target.checked }),
											className: "mt-1 size-5 shrink-0 accent-rust"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-start gap-3 py-2 text-sm text-fg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0 flex-1",
											children: [
												"Remises ida y vuelta",
												city.local ? "" : ` · terminal ${ars(TERMINAL_REMIS)}`,
												" · venue ",
												ars(venue.remis),
												" por persona"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: draft.transfers,
											onChange: (e) => setDraft({ transfers: e.target.checked }),
											className: "mt-1 size-5 shrink-0 accent-rust"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Merch y extras por persona" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: [
											0,
											15e3,
											3e4
										].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-pressed": draft.merch === n,
											onClick: () => setDraft({ merch: n }),
											className: `min-h-11 rounded-lg border px-3 text-sm font-semibold ${draft.merch === n ? "border-rust bg-rust text-rust-ink" : "border-line text-fg"}`,
											children: n === 0 ? "Nada" : ars(n)
										}, n))
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "rounded-lg border border-line px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
									className: "min-h-11 cursor-pointer py-2 text-sm font-semibold text-fg",
									children: "Ajustar tarifas de referencia"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 pb-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
											label: "Semicama de ida, esta ciudad",
											disabled: !!city.local,
											value: draft.fareOverride,
											placeholder: String(city.semicama),
											onChange: (fareOverride) => setDraft({ fareOverride })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
											label: "Entrada de este recital",
											value: draft.ticketOverride,
											placeholder: String(show.ticket),
											onChange: (ticketOverride) => setDraft({ ticketOverride })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyField, {
											label: "Precio por noche de esta estadía",
											value: draft.lodgingOverride,
											placeholder: String(lodging.rate),
											onChange: (lodgingOverride) => setDraft({ lodgingOverride })
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "border-t border-line pt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: `Pasajes ${city.local ? "" : `· ${BUS_CLASS[draft.busClass].label}`}`,
										v: plan.bus
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Entradas",
										v: plan.tickets
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: `Alojamiento · ${plan.nights} ${plan.nights === 1 ? "noche" : "noches"}`,
										v: plan.stay
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Traslados en la ciudad",
										v: plan.transfer
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Comida",
										v: plan.meals
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Merch y extras",
										v: plan.extras
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: `${field} min-w-0 sm:flex-1`,
									value: draft.label,
									placeholder: "Nombre del paquete, ej. Malón con los pibes",
									maxLength: 60,
									onChange: (e) => setDraft({ label: e.target.value })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => save(),
									className: "min-h-11 shrink-0 rounded-lg bg-rust px-4 font-semibold text-rust-ink",
									children: "Guardar paquete"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void copySummary(),
								className: "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line px-3 text-sm font-semibold text-fg",
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "Resumen copiado" : "Copiar resumen para el grupo"]
							}),
							manual ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: `${field} h-40 py-2 font-mono text-sm`,
								readOnly: true,
								value: text
							}) : null
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				"aria-labelledby": "comparar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "comparar",
						className: "font-poster text-2xl tracking-wide",
						children: "El mismo recital, los 10 orígenes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 text-sm text-muted",
						children: "Con esta categoría, este ritmo y esta estadía. Córdoba queda primero porque no paga micro."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-2",
						children: compared.map((row) => {
							const on = row.city.id === city.id;
							const pct = Math.max(6, Math.round(row.total / max * 100));
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setDraft({ cityId: row.city.id }),
								className: `w-full rounded-lg border px-3 py-2 text-left ${on ? "border-rust bg-surface" : "border-line"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-baseline justify-between gap-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold text-fg",
										children: [
											row.city.rank,
											". ",
											row.city.short
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums text-fg",
										children: [ars(row.total), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: [
												" · ",
												ars(row.per),
												" c/u"
											]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-2 block h-1.5 rounded-full bg-bg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `block h-full rounded-full ${on ? "bg-rust" : "bg-faint"}`,
										style: { width: `${pct}%` }
									})
								})]
							}) }, row.city.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				"aria-labelledby": "guardados",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "guardados",
					className: "font-poster text-2xl tracking-wide",
					children: "Paquetes guardados"
				}), saved.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: "Todavía no hay ninguno en este navegador. Guardá dos orígenes y compará el número."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-2",
					children: saved.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavedRow, {
						draft: item.draft,
						custom: customShows,
						onOpen: () => load(item.draft),
						onDelete: () => removeSaved(item.id)
					}, item.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-12 border-t border-line pt-4 text-sm text-faint",
				children: "Hierro no vende pasajes ni entradas. Las fechas de la cartelera modelo sirven para armar el presupuesto; cargá el recital real cuando esté confirmado. Los precios de micro son una foto de septiembre de 2026 y se mueven con la empresa, el día y la anticipación."
			})
		]
	});
}
function Label({ children, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mb-2 flex items-center gap-2 text-sm font-semibold text-fg",
		children: [icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-rust",
			children: icon
		}) : null, children]
	});
}
function Stepper({ value, min, max, onChange, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "inline-flex items-center rounded-lg border border-line bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "grid size-11 place-items-center text-fg disabled:opacity-40",
				disabled: value <= min,
				onClick: () => onChange(value - 1),
				"aria-label": `Menos ${label}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-8 text-center font-poster text-xl tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "grid size-11 place-items-center text-fg disabled:opacity-40",
				disabled: value >= max,
				onClick: () => onChange(value + 1),
				"aria-label": `Más ${label}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
			})
		]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-4 border-b border-line py-2 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "min-w-0 text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "shrink-0 tabular-nums font-semibold text-fg",
			children: ars(v)
		})]
	});
}
function Itinerary({ plan, roundTrip, local }) {
	if (local || !plan.outbound) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-sm text-muted",
		children: "Sin tramo de larga distancia."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
		className: "mt-3 grid gap-2 border-l border-line pl-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block font-semibold text-fg",
			children: "Ida · horario modelo"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-muted",
			children: [
				cap(when(plan.outbound.depart, "EEE d MMM · HH:mm")),
				" · ",
				plan.outbound.from,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				cap(when(plan.outbound.arrive, "EEE d MMM · HH:mm")),
				" · ",
				plan.outbound.to
			]
		})] }), roundTrip && plan.inbound ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block font-semibold text-fg",
			children: "Vuelta · horario modelo"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-muted",
			children: [
				cap(when(plan.inbound.depart, "EEE d MMM · HH:mm")),
				" · ",
				plan.inbound.from,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				cap(when(plan.inbound.arrive, "EEE d MMM · HH:mm")),
				" · ",
				plan.inbound.to
			]
		})] }) : null]
	});
}
function MoneyField({ label, value, placeholder, disabled, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm text-muted",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: `${field} mt-1`,
			inputMode: "numeric",
			disabled,
			placeholder,
			value: value ?? "",
			onChange: (e) => {
				const digits = e.target.value.replace(/\D/g, "");
				onChange(digits ? Number(digits) : null);
			}
		})]
	});
}
function CustomShow({ onCreate }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [artist, setArtist] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("2026-11-07");
	const [doors, setDoors] = (0, import_react.useState)("21:00");
	const [venueId, setVenueId] = (0, import_react.useState)(VENUES[0].id);
	const [ticket, setTicket] = (0, import_react.useState)("25000");
	const [genre, setGenre] = (0, import_react.useState)("Heavy");
	const [error, setError] = (0, import_react.useState)("");
	if (!open) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setOpen(true),
		className: "mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-rust",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Cargar un recital real"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-3 grid gap-3 rounded-card border border-line bg-surface p-4 sm:grid-cols-2",
		onSubmit: (e) => {
			e.preventDefault();
			const price = Number(ticket.replace(/\D/g, ""));
			if (!artist.trim() || !date || !Number.isFinite(price)) {
				setError("Completá banda, fecha y precio de entrada.");
				return;
			}
			setError("");
			onCreate({
				id: `custom-${crypto.randomUUID()}`,
				artist: artist.trim(),
				bill: "Cargado por vos",
				date,
				doors: doors || "21:00",
				venueId,
				genre: genre.trim() || "Metal",
				ticket: price,
				custom: true
			});
			setArtist("");
			setOpen(false);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm text-muted sm:col-span-2",
				children: ["Banda", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: `${field} mt-1`,
					value: artist,
					onChange: (e) => setArtist(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm text-muted",
				children: ["Fecha", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: `${field} mt-1`,
					type: "date",
					value: date,
					onChange: (e) => setDate(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm text-muted",
				children: ["Puertas", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: `${field} mt-1`,
					type: "time",
					value: doors,
					onChange: (e) => setDoors(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm text-muted",
				children: ["Venue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: `${field} mt-1`,
					value: venueId,
					onChange: (e) => setVenueId(e.target.value),
					children: VENUES.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: v.id,
						children: v.name
					}, v.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm text-muted",
				children: ["Entrada", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: `${field} mt-1`,
					inputMode: "numeric",
					value: ticket,
					onChange: (e) => setTicket(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm text-muted sm:col-span-2",
				children: ["Estilo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: `${field} mt-1`,
					value: genre,
					onChange: (e) => setGenre(e.target.value)
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-heat-5 sm:col-span-2",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "min-h-11 rounded-lg bg-rust px-4 font-semibold text-rust-ink",
					children: "Agregar a la cartelera"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen(false),
					className: "min-h-11 rounded-lg border border-line px-4 font-semibold text-fg",
					children: "Cancelar"
				})]
			})
		]
	});
}
function SavedRow({ draft, custom, onOpen, onDelete }) {
	const resolved = resolveDraft(draft, custom);
	const name = draft.label.trim() || `${resolved.show.artist} · ${resolved.city.short} · ${draft.party} pax`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-center gap-2 rounded-card border border-line bg-surface px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onOpen,
			className: "min-h-11 flex-1 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-semibold text-fg",
				children: name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "block text-sm text-muted",
				children: [
					BUS_CLASS[draft.busClass].label,
					" · ",
					ars(resolved.plan.total),
					" · ",
					ars(resolved.plan.perPerson),
					" c/u"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onDelete,
			className: "grid size-11 place-items-center text-muted",
			"aria-label": `Borrar ${name}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HierroApp, {});
}
//#endregion
export { Home as component };
