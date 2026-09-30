export type Venue = {
  id: string;
  name: string;
  barrio: string;
  remis: number;
  walkable: boolean;
  note: string;
};

export type Show = {
  id: string;
  artist: string;
  bill: string;
  date: string;
  doors: string;
  venueId: string;
  genre: string;
  ticket: number;
  custom?: boolean;
};

export type City = {
  rank: number;
  id: string;
  name: string;
  short: string;
  provinces: string;
  population: number;
  local?: boolean;
  hours: number;
  semicama: number;
  terminal: string;
  empresas: string[];
  note: string;
};

export type Lodging = {
  id: string;
  name: string;
  detail: string;
  rate: number;
  unit: "bed" | "room";
  sleeps: number;
};

export const FOOD_PER_DAY = 16_000;
export const TERMINAL_REMIS = 6_500;

export const VENUES: Venue[] = [
  {
    id: "paraguay",
    name: "Club Paraguay",
    barrio: "Centro",
    remis: 4_500,
    walkable: true,
    note: "A unas 20 cuadras de la terminal. De noche, mejor remis.",
  },
  {
    id: "plaza",
    name: "Plaza de la Música",
    barrio: "Parque Sarmiento",
    remis: 7_000,
    walkable: false,
    note: "Sobre el parque. Remis corto desde Nueva Córdoba.",
  },
  {
    id: "quality",
    name: "Quality Espacio",
    barrio: "Chateau Carreras",
    remis: 14_000,
    walkable: false,
    note: "Lejos del centro. Calculá remis o taxi sí o sí.",
  },
  {
    id: "libertador",
    name: "Teatro del Libertador",
    barrio: "Centro",
    remis: 4_000,
    walkable: true,
    note: "Plaza San Martín. Butacas: llegá antes de que cierren puertas.",
  },
  {
    id: "orfeo",
    name: "Orfeo Superdomo",
    barrio: "Ferreyra",
    remis: 12_000,
    walkable: false,
    note: "Sobre circunvalación. Sin colectivo cómodo a la salida.",
  },
];

export const CITIES: City[] = [
  {
    rank: 1,
    id: "amba",
    name: "Gran Buenos Aires (AMBA)",
    short: "AMBA",
    provinces: "CABA y Prov. de Buenos Aires",
    population: 15_291_277,
    hours: 9.5,
    semicama: 38_000,
    terminal: "Retiro",
    empresas: ["Flecha Bus", "Chevallier", "Sierras de Córdoba", "Gral. Urquiza"],
    note: "El corredor con más frecuencias. El expreso puede bajar de 9 h.",
  },
  {
    rank: 2,
    id: "cba",
    name: "Gran Córdoba",
    short: "Córdoba",
    provinces: "Córdoba",
    population: 1_705_741,
    local: true,
    hours: 0,
    semicama: 0,
    terminal: "Sin micro",
    empresas: [],
    note: "El recital es en tu ciudad. El paquete es entrada, cama y remis.",
  },
  {
    rank: 3,
    id: "rosario",
    name: "Gran Rosario",
    short: "Rosario",
    provinces: "Santa Fe",
    population: 1_455_292,
    hours: 4.5,
    semicama: 22_000,
    terminal: "Terminal de Rosario",
    empresas: ["Flecha Bus", "El Práctico", "Sierras de Córdoba"],
    note: "El salto más corto fuera de Córdoba. Da para ir y volver el finde.",
  },
  {
    rank: 4,
    id: "mendoza",
    name: "Gran Mendoza",
    short: "Mendoza",
    provinces: "Mendoza",
    population: 1_066_893,
    hours: 9,
    semicama: 40_000,
    terminal: "Terminal de Mendoza",
    empresas: ["Andesmar", "CATA", "Chevallier"],
    note: "Cruces de noche por San Luis. La cama se nota.",
  },
  {
    rank: 5,
    id: "tucuman",
    name: "Gran San Miguel de Tucumán",
    short: "Tucumán",
    provinces: "Tucumán",
    population: 1_052_194,
    hours: 8,
    semicama: 34_000,
    terminal: "Terminal de Tucumán",
    empresas: ["La Veloz del Norte", "Flecha Bus", "Aconquija"],
    note: "Ocho horas clavadas. Llegar a la mañana del show alcanza.",
  },
  {
    rank: 6,
    id: "laplata",
    name: "Gran La Plata",
    short: "La Plata",
    provinces: "Provincia de Buenos Aires",
    population: 933_474,
    hours: 11,
    semicama: 44_000,
    terminal: "Terminal de La Plata",
    empresas: ["El Turista", "Plata Bus"],
    note: "Hay pocas directas. A veces combina en Buenos Aires y se estira.",
  },
  {
    rank: 7,
    id: "salta",
    name: "Gran Salta",
    short: "Salta",
    provinces: "Salta",
    population: 671_015,
    hours: 12,
    semicama: 52_000,
    terminal: "Terminal de Salta",
    empresas: ["La Veloz del Norte", "Flecha Bus"],
    note: "Viaje largo. Conviene llegar el día anterior.",
  },
  {
    rank: 8,
    id: "mdq",
    name: "Mar del Plata",
    short: "Mar del Plata",
    provinces: "Provincia de Buenos Aires",
    population: 644_234,
    hours: 14.5,
    semicama: 58_000,
    terminal: "Terminal de Mar del Plata",
    empresas: ["Flecha Bus", "Plusmar"],
    note: "Muchas frecuencias pasan por Buenos Aires. No lo subestimes.",
  },
  {
    rank: 9,
    id: "neuquen",
    name: "Gran Neuquén",
    short: "Neuquén",
    provinces: "Neuquén y Río Negro",
    population: 551_988,
    hours: 14,
    semicama: 60_000,
    terminal: "Terminal de Neuquén",
    empresas: ["Vía Bariloche", "Andesmar"],
    note: "Una de las rutas más caras del ranking. La suite vale si podés.",
  },
  {
    rank: 10,
    id: "sanjuan",
    name: "Gran San Juan",
    short: "San Juan",
    provinces: "San Juan",
    population: 546_613,
    hours: 8.5,
    semicama: 36_000,
    terminal: "Terminal de San Juan",
    empresas: ["CATA", "Andesmar"],
    note: "Sale de noche y amanece en Córdoba. Similar a Mendoza, un poco más corto.",
  },
];

export const LODGINGS: Lodging[] = [
  {
    id: "hostel",
    name: "Hostel en Nueva Córdoba",
    detail: "Cama en compartida, a cuadras de la terminal.",
    rate: 18_000,
    unit: "bed",
    sleeps: 1,
  },
  {
    id: "centro",
    name: "Hotel simple en Centro",
    detail: "Doble. Caminable a Paraguay y al Libertador.",
    rate: 55_000,
    unit: "room",
    sleeps: 2,
  },
  {
    id: "nc",
    name: "Hotel en Nueva Córdoba",
    detail: "La base de siempre: terminal, bares y el parque cerca.",
    rate: 89_000,
    unit: "room",
    sleeps: 2,
  },
  {
    id: "guemes",
    name: "Depto en Güemes",
    detail: "Hasta 3 personas, cocina y el after a pie.",
    rate: 130_000,
    unit: "room",
    sleeps: 3,
  },
];

export const SHOWS: Show[] = [
  {
    id: "carajo",
    artist: "Carajo",
    bill: "Show de club",
    date: "2026-10-31",
    doors: "21:00",
    venueId: "paraguay",
    genre: "Groove",
    ticket: 22_000,
  },
  {
    id: "lorihen",
    artist: "Lörihen + Tren Loco",
    bill: "Doble de heavy nacional",
    date: "2026-11-06",
    doors: "21:00",
    venueId: "paraguay",
    genre: "Heavy",
    ticket: 18_000,
  },
  {
    id: "oconnor",
    artist: "O'Connor",
    bill: "Heavy rock",
    date: "2026-11-13",
    doors: "21:00",
    venueId: "plaza",
    genre: "Heavy",
    ticket: 30_000,
  },
  {
    id: "malon",
    artist: "Malón",
    bill: "Thrash, el legado",
    date: "2026-11-14",
    doors: "21:00",
    venueId: "plaza",
    genre: "Thrash",
    ticket: 28_000,
  },
  {
    id: "horcas",
    artist: "Horcas",
    bill: "Heavy en espacio grande",
    date: "2026-11-21",
    doors: "21:00",
    venueId: "quality",
    genre: "Heavy",
    ticket: 35_000,
  },
  {
    id: "animal",
    artist: "A.N.I.M.A.L.",
    bill: "Groove / metal",
    date: "2026-11-28",
    doors: "21:00",
    venueId: "quality",
    genre: "Groove",
    ticket: 42_000,
  },
  {
    id: "rata",
    artist: "Rata Blanca",
    bill: "Butacas en el Libertador",
    date: "2026-12-04",
    doors: "20:30",
    venueId: "libertador",
    genre: "Power",
    ticket: 48_000,
  },
  {
    id: "feria",
    artist: "Feria del Hierro",
    bill: "Mastifal, Tren Loco y escena local",
    date: "2026-12-12",
    doors: "18:00",
    venueId: "orfeo",
    genre: "Festival",
    ticket: 26_000,
  },
];

export const BUS_CLASS = {
  semicama: { id: "semicama", label: "Semicama", mult: 1, hint: "Butaca reclinable" },
  cama: { id: "cama", label: "Cama", mult: 1.36, hint: "Mejor de 8 h en adelante" },
  suite: { id: "suite", label: "Cama suite", mult: 1.8, hint: "Premium, si el cuerpo pide" },
} as const;

export type BusClass = keyof typeof BUS_CLASS;

const RANK_TONE = [
  { box: "bg-heat-1", ink: "text-rust-ink" },
  { box: "bg-heat-2", ink: "text-rust-ink" },
  { box: "bg-heat-3", ink: "text-rust-ink" },
  { box: "bg-heat-4", ink: "text-rust-ink" },
  { box: "bg-heat-5", ink: "text-fg" },
] as const;

export function rankTone(rank: number) {
  const idx = Math.max(0, Math.min(4, 5 - Math.ceil(rank / 2)));
  return RANK_TONE[idx];
}

export function venueById(id: string): Venue {
  return VENUES.find((v) => v.id === id) ?? VENUES[0];
}
