import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BedDouble,
  Bus,
  Check,
  Clock,
  Copy,
  Hexagon,
  MapPin,
  Minus,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import {
  BUS_CLASS,
  CITIES,
  FOOD_PER_DAY,
  HEAT_LEGEND,
  LODGINGS,
  SHOWS,
  TERMINAL_REMIS,
  VENUES,
  rankTone,
  venueById,
  type BusClass,
  type Show,
} from "@/data/catalog";
import {
  ars,
  buildPlan,
  cap,
  formatHours,
  people,
  summaryText,
  when,
  type Pace,
  type PlanInput,
} from "@/lib/plan";
import { ArgentinaMap } from "@/components/argentina-map";
import { useHierro, type Draft } from "@/lib/plans-store";

const field =
  "h-11 w-full rounded-lg border border-line bg-bg px-3 text-base text-fg outline-none";

function allShows(custom: Show[]): Show[] {
  return [...SHOWS, ...custom].sort((a, b) => a.date.localeCompare(b.date));
}

function resolveDraft(draft: Draft, custom: Show[]) {
  const shows = allShows(custom);
  const show = shows.find((s) => s.id === draft.showId) ?? shows[0];
  const city = CITIES.find((c) => c.id === draft.cityId) ?? CITIES[0];
  const lodging = LODGINGS.find((l) => l.id === draft.lodgingId) ?? LODGINGS[2];
  const input: PlanInput = {
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
    lodgingOverride: draft.lodgingOverride,
  };
  return { shows, show, city, lodging, input, plan: buildPlan(input) };
}

export function HierroApp() {
  const draft = useHierro((s) => s.draft);
  const setDraft = useHierro((s) => s.setDraft);
  const customShows = useHierro((s) => s.customShows);
  const saved = useHierro((s) => s.saved);
  const save = useHierro((s) => s.save);
  const removeSaved = useHierro((s) => s.removeSaved);
  const load = useHierro((s) => s.load);
  const addShow = useHierro((s) => s.addShow);
  const removeShow = useHierro((s) => s.removeShow);

  useEffect(() => {
    void Promise.resolve(useHierro.persist.rehydrate()).catch(() => undefined);
  }, []);

  const { shows, show, city, lodging, input, plan } = resolveDraft(draft, customShows);
  const venue = venueById(show.venueId);
  const [copied, setCopied] = useState(false);
  const [manual, setManual] = useState(false);
  const text = useMemo(() => summaryText(input, plan), [input, plan]);

  const neighbor = shows.find((s) => {
    if (s.id === show.id) return false;
    const delta = Math.abs(Date.parse(s.date) - Date.parse(show.date));
    return delta > 0 && delta <= 2 * 86_400_000;
  });

  const compared = CITIES.map((c) => {
    const alt = buildPlan({ ...input, city: c, fareOverride: c.id === city.id ? draft.fareOverride : null });
    return { city: c, total: alt.total, per: alt.perPerson };
  }).sort((a, b) => a.total - b.total);
  const max = compared[compared.length - 1]?.total || 1;

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setManual(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setManual(true);
      setCopied(false);
    }
  }

  return (
    <main className="mx-auto min-w-0 max-w-6xl overflow-x-clip px-4 pb-24 pt-6 sm:px-6 sm:pt-8">
      <header className="grid gap-6 border-b border-line pb-6 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold tracking-wide text-rust">
            <Hexagon className="size-4" aria-hidden="true" />
            Planificador · no es boletería
          </p>
          <h1 className="mt-2 font-poster text-5xl tracking-wide text-fg sm:text-6xl">HIERRO</h1>
          <p className="mt-2 max-w-xl text-lg text-fg">
            Pasajes de colectivo y estadía a Córdoba para recitales de heavy metal, saliendo de las
            10 áreas urbanas más pobladas del país.
          </p>
          <p className="mt-2 max-w-xl text-muted">
            Censo 2022. Tarifas de referencia de septiembre de 2026: el semicama Buenos Aires–Córdoba
            arranca cerca de {ars(38_000)}. Ajustalas antes de comprar.
          </p>
        </div>
        <aside className="rounded-card border border-line bg-surface p-4">
          <p className="text-sm font-semibold text-fg">
            Cantidad de habitantes en hexágonos regulares de 600m de lado
          </p>
          <ul className="mt-3 grid gap-1.5">
            {HEAT_LEGEND.map((row) => (
              <li key={row.id} className="flex items-center gap-2 text-sm text-muted">
                <span className={`size-3.5 shrink-0 rounded-sm ${row.box}`} aria-hidden="true" />
                {row.range}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-faint">
            En el mapa, el rojo es más gente por hexágono. Acá el mismo calor marca las áreas de
            donde sale la demanda.
          </p>
        </aside>
      </header>

      <section className="mt-8" aria-labelledby="cartelera">
        <div className="mb-3 flex items-end justify-between gap-3">
          <h2 id="cartelera" className="font-poster text-2xl tracking-wide">
            Cartelera modelo
          </h2>
          <p className="text-sm text-faint">Octubre – diciembre 2026</p>
        </div>
        <div className="flex max-w-full gap-3 overflow-x-auto pb-2">
          {shows.map((item) => {
            const v = venueById(item.venueId);
            const on = item.id === show.id;
            const tone = on ? "border-rust bg-surface" : "border-line bg-surface hover:border-faint";
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setDraft({ showId: item.id })}
                aria-pressed={on}
                className={`flex w-64 shrink-0 flex-col rounded-card border p-4 text-left ${tone}`}
              >
                <span className="text-sm font-semibold text-rust">
                  {cap(when(new Date(item.date + "T12:00:00"), "EEE d MMM"))} · {item.genre}
                </span>
                <span className="mt-1 font-poster text-2xl tracking-wide text-fg">{item.artist}</span>
                <span className="mt-1 text-sm text-muted">{item.bill}</span>
                <span className="mt-3 flex items-center gap-1.5 text-sm text-fg">
                  <MapPin className="size-3.5 text-faint" aria-hidden="true" />
                  {v.name}
                </span>
                <span className="mt-auto pt-3 font-poster text-xl tracking-wide text-fg">
                  {ars(item.id === show.id && draft.ticketOverride !== null ? draft.ticketOverride : item.ticket)}
                </span>
              </button>
            );
          })}
        </div>
        <CustomShow
          onCreate={(item) => {
            addShow(item);
            setDraft({ showId: item.id });
          }}
        />
      </section>

      <div className="mt-8 grid min-w-0 items-start gap-6 lg:grid-cols-2">
        <section className="order-2 min-w-0 lg:order-1" aria-labelledby="origenes">
          <h2 id="origenes" className="font-poster text-2xl tracking-wide">
            Desde dónde salís
          </h2>
          <p className="mb-3 text-sm text-muted">Puesto, población del censo y semicama de ida.</p>
          <ul className="grid gap-2">
            {CITIES.map((item) => {
              const on = item.id === city.id;
              const tone = rankTone(item.rank);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setDraft({ cityId: item.id })}
                    className={`flex w-full items-center gap-3 rounded-card border px-3 py-2.5 text-left ${
                      on ? "border-rust bg-surface" : "border-line bg-surface/40 hover:border-faint"
                    }`}
                  >
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-md font-poster text-lg ${tone.box} ${tone.ink}`}
                    >
                      {item.rank}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-fg">{item.name}</span>
                      <span className="block truncate text-sm text-muted">
                        {item.provinces} · {people(item.population)}
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-sm font-semibold text-fg">{formatHours(item.hours)}</span>
                      <span className="block text-sm text-muted">
                        {item.local ? "local" : ars(item.id === city.id && draft.fareOverride !== null ? draft.fareOverride : item.semicama)}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <ArgentinaMap cityId={city.id} />
        </section>

        <section className="order-1 min-w-0 rounded-card border border-line bg-surface lg:order-2" aria-labelledby="paquete">
          <div className="sticky top-0 z-10 rounded-t-card border-b border-line bg-surface/95 px-4 py-3 backdrop-blur sm:px-5">
            <p className="text-sm text-muted">Total del grupo · {draft.party} personas</p>
            <p className="font-poster text-4xl tracking-wide text-fg sm:text-5xl" aria-live="polite">
              {ars(plan.total)}
            </p>
            <p className="text-muted">{ars(plan.perPerson)} por persona</p>
          </div>

          <div className="grid gap-5 px-4 py-5 sm:px-5">
            <div>
              <h2 id="paquete" className="font-poster text-3xl tracking-wide">
                {show.artist}
              </h2>
              <p className="text-muted">
                {cap(when(new Date(show.date + "T12:00:00"), "EEEE d 'de' MMMM"))} · puertas {show.doors} ·{" "}
                {venue.name}, {venue.barrio}
              </p>
              <p className="mt-1 text-sm text-faint">{venue.note}</p>
              {show.custom ? (
                <button
                  type="button"
                  onClick={() => removeShow(show.id)}
                  className="mt-2 text-sm font-semibold text-heat-5"
                >
                  Quitar este recital cargado
                </button>
              ) : null}
              {neighbor ? (
                <p className="mt-3 rounded-lg bg-bg px-3 py-2 text-sm text-muted">
                  Cerca en el calendario: {neighbor.artist} (
                  {cap(when(new Date(neighbor.date + "T12:00:00"), "EEE d MMM"))}
                  ).{" "}
                  <button
                    type="button"
                    className="font-semibold text-rust"
                    onClick={() => setDraft({ showId: neighbor.id })}
                  >
                    Ver ese recital
                  </button>
                </p>
              ) : null}
            </div>

            <div>
              <Label icon={<Users className="size-4" />}>Personas</Label>
              <Stepper
                value={draft.party}
                min={1}
                max={8}
                onChange={(party) => setDraft({ party })}
                label="personas"
              />
            </div>

            <fieldset>
              <legend className="mb-2 flex items-center gap-2 text-sm font-semibold text-fg">
                <Bus className="size-4 text-rust" aria-hidden="true" />
                Categoría del micro
              </legend>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(BUS_CLASS) as BusClass[]).map((id) => {
                  const item = BUS_CLASS[id];
                  const on = draft.busClass === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={on}
                      disabled={!!city.local}
                      onClick={() => setDraft({ busClass: id })}
                      className={`min-h-11 rounded-lg border px-2 py-2 text-left ${
                        on ? "border-rust bg-rust text-rust-ink" : "border-line bg-bg text-fg"
                      } disabled:opacity-40`}
                    >
                      <span className="block text-sm font-semibold">{item.label}</span>
                      <span className={`block text-xs ${on ? "opacity-80" : "text-muted"}`}>{item.hint}</span>
                    </button>
                  );
                })}
              </div>
              <label className="mt-3 flex min-h-11 items-center gap-2 text-sm text-fg">
                <input
                  type="checkbox"
                  checked={draft.roundTrip}
                  disabled={!!city.local}
                  onChange={(e) => setDraft({ roundTrip: e.target.checked })}
                  className="size-4 accent-rust"
                />
                Ida y vuelta
              </label>
              <p className="text-sm text-muted">{city.note}</p>
              {city.empresas.length > 0 ? (
                <p className="text-sm text-faint">Empresas habituales: {city.empresas.join(", ")}.</p>
              ) : null}
            </fieldset>

            <fieldset>
              <legend className="mb-2 flex items-center gap-2 text-sm font-semibold text-fg">
                <Clock className="size-4 text-rust" aria-hidden="true" />
                Cómo viajar
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ["ajustado", "Ajustado", "Llegar y ver el show"],
                    ["holgado", "Holgado", "Un día antes en la ciudad"],
                  ] as const
                ).map(([id, title, hint]) => {
                  const on = draft.pace === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setDraft({ pace: id satisfies Pace })}
                      className={`min-h-11 rounded-lg border px-3 py-2 text-left ${
                        on ? "border-rust bg-rust text-rust-ink" : "border-line bg-bg text-fg"
                      }`}
                    >
                      <span className="block text-sm font-semibold">{title}</span>
                      <span className={`block text-xs ${on ? "opacity-80" : "text-muted"}`}>{hint}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-sm text-fg">{plan.advice}</p>
              <Itinerary plan={plan} roundTrip={draft.roundTrip} local={!!city.local} />
            </fieldset>

            <div>
              <Label icon={<BedDouble className="size-4" />}>
                Noches
                {draft.nights === null ? " · sugeridas" : ""}
              </Label>
              <div className="flex flex-wrap items-center gap-2">
                <Stepper
                  value={plan.nights}
                  min={0}
                  max={7}
                  onChange={(nights) => setDraft({ nights })}
                  label="noches"
                />
                {draft.nights !== null ? (
                  <button
                    type="button"
                    onClick={() => setDraft({ nights: null })}
                    className="min-h-11 rounded-lg border border-line px-3 text-sm font-semibold text-fg"
                  >
                    Usar sugeridas ({plan.suggested})
                  </button>
                ) : null}
              </div>
              <div className="mt-3 grid gap-2">
                {LODGINGS.map((item) => {
                  const on = item.id === lodging.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setDraft({ lodgingId: item.id })}
                      className={`rounded-lg border px-3 py-2 text-left ${
                        on ? "border-rust bg-bg" : "border-line"
                      }`}
                    >
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-semibold text-fg">{item.name}</span>
                        <span className="shrink-0 text-sm text-muted">
                          {ars(item.id === lodging.id && draft.lodgingOverride !== null ? draft.lodgingOverride : item.rate)}
                        </span>
                      </span>
                      <span className="block text-sm text-muted">{item.detail}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-sm text-faint">
                {lodging.unit === "bed"
                  ? `${plan.rooms} ${plan.rooms === 1 ? "cama" : "camas"}`
                  : `${plan.rooms} ${plan.rooms === 1 ? "habitación" : "habitaciones"} para ${draft.party}`}
                . Si las noches son 0, no se cobra estadía.
              </p>
            </div>

            <div className="grid gap-3">
              <label className="flex items-start gap-3 py-2 text-sm text-fg">
                <span className="min-w-0 flex-1">
                  Comida · {ars(FOOD_PER_DAY)} por persona por día ({plan.days}{" "}
                  {plan.days === 1 ? "día" : "días"})
                </span>
                <input
                  type="checkbox"
                  checked={draft.food}
                  onChange={(e) => setDraft({ food: e.target.checked })}
                  className="mt-1 size-5 shrink-0 accent-rust"
                />
              </label>
              <label className="flex items-start gap-3 py-2 text-sm text-fg">
                <span className="min-w-0 flex-1">
                  Remises ida y vuelta
                  {city.local ? "" : ` · terminal ${ars(TERMINAL_REMIS)}`} · venue {ars(venue.remis)} por
                  persona
                </span>
                <input
                  type="checkbox"
                  checked={draft.transfers}
                  onChange={(e) => setDraft({ transfers: e.target.checked })}
                  className="mt-1 size-5 shrink-0 accent-rust"
                />
              </label>
              <div>
                <Label>Merch y extras por persona</Label>
                <div className="flex flex-wrap gap-2">
                  {[0, 15_000, 30_000].map((n) => (
                    <button
                      key={n}
                      type="button"
                      aria-pressed={draft.merch === n}
                      onClick={() => setDraft({ merch: n })}
                      className={`min-h-11 rounded-lg border px-3 text-sm font-semibold ${
                        draft.merch === n ? "border-rust bg-rust text-rust-ink" : "border-line text-fg"
                      }`}
                    >
                      {n === 0 ? "Nada" : ars(n)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <details className="rounded-lg border border-line px-3 py-2">
              <summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold text-fg">
                Ajustar tarifas de referencia
              </summary>
              <div className="grid gap-3 pb-2">
                <MoneyField
                  label="Semicama de ida, esta ciudad"
                  disabled={!!city.local}
                  value={draft.fareOverride}
                  placeholder={String(city.semicama)}
                  onChange={(fareOverride) => setDraft({ fareOverride })}
                />
                <MoneyField
                  label="Entrada de este recital"
                  value={draft.ticketOverride}
                  placeholder={String(show.ticket)}
                  onChange={(ticketOverride) => setDraft({ ticketOverride })}
                />
                <MoneyField
                  label="Precio por noche de esta estadía"
                  value={draft.lodgingOverride}
                  placeholder={String(lodging.rate)}
                  onChange={(lodgingOverride) => setDraft({ lodgingOverride })}
                />
              </div>
            </details>

            <dl className="border-t border-line pt-2">
              <Row k={`Pasajes ${city.local ? "" : `· ${BUS_CLASS[draft.busClass].label}`}`} v={plan.bus} />
              <Row k="Entradas" v={plan.tickets} />
              <Row k={`Alojamiento · ${plan.nights} ${plan.nights === 1 ? "noche" : "noches"}`} v={plan.stay} />
              <Row k="Traslados en la ciudad" v={plan.transfer} />
              <Row k="Comida" v={plan.meals} />
              <Row k="Merch y extras" v={plan.extras} />
            </dl>

            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                className={`${field} min-w-0 sm:flex-1`}
                value={draft.label}
                placeholder="Nombre del paquete, ej. Malón con los pibes"
                maxLength={60}
                onChange={(e) => setDraft({ label: e.target.value })}
              />
              <button
                type="button"
                onClick={() => save()}
                className="min-h-11 shrink-0 rounded-lg bg-rust px-4 font-semibold text-rust-ink"
              >
                Guardar paquete
              </button>
            </div>
            <button
              type="button"
              onClick={() => void copySummary()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line px-3 text-sm font-semibold text-fg"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Resumen copiado" : "Copiar resumen para el grupo"}
            </button>
            {manual ? (
              <textarea className={`${field} h-40 py-2 font-mono text-sm`} readOnly value={text} />
            ) : null}
          </div>
        </section>
      </div>

      <section className="mt-10" aria-labelledby="comparar">
        <h2 id="comparar" className="font-poster text-2xl tracking-wide">
          El mismo recital, los 10 orígenes
        </h2>
        <p className="mb-4 text-sm text-muted">
          Con esta categoría, este ritmo y esta estadía. Córdoba queda primero porque no paga micro.
        </p>
        <ul className="grid gap-2">
          {compared.map((row) => {
            const on = row.city.id === city.id;
            const pct = Math.max(6, Math.round((row.total / max) * 100));
            return (
              <li key={row.city.id}>
                <button
                  type="button"
                  onClick={() => setDraft({ cityId: row.city.id })}
                  className={`w-full rounded-lg border px-3 py-2 text-left ${
                    on ? "border-rust bg-surface" : "border-line"
                  }`}
                >
                  <span className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="font-semibold text-fg">
                      {row.city.rank}. {row.city.short}
                    </span>
                    <span className="tabular-nums text-fg">
                      {ars(row.total)}
                      <span className="text-muted"> · {ars(row.per)} c/u</span>
                    </span>
                  </span>
                  <span className="mt-2 block h-1.5 rounded-full bg-bg">
                    <span
                      className={`block h-full rounded-full ${on ? "bg-rust" : "bg-faint"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="guardados">
        <h2 id="guardados" className="font-poster text-2xl tracking-wide">
          Paquetes guardados
        </h2>
        {saved.length === 0 ? (
          <p className="mt-2 text-muted">
            Todavía no hay ninguno en este navegador. Guardá dos orígenes y compará el número.
          </p>
        ) : (
          <ul className="mt-3 grid gap-2">
            {saved.map((item) => (
              <SavedRow
                key={item.id}
                draft={item.draft}
                custom={customShows}
                onOpen={() => load(item.draft)}
                onDelete={() => removeSaved(item.id)}
              />
            ))}
          </ul>
        )}
      </section>

      <footer className="mt-12 border-t border-line pt-4 text-sm text-faint">
        Hierro no vende pasajes ni entradas. Las fechas de la cartelera modelo sirven para armar el
        presupuesto; cargá el recital real cuando esté confirmado. Los precios de micro son una foto de
        septiembre de 2026 y se mueven con la empresa, el día y la anticipación.
      </footer>
    </main>
  );
}

function Label({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-fg">
      {icon ? <span className="text-rust">{icon}</span> : null}
      {children}
    </p>
  );
}

function Stepper({
  value,
  min,
  max,
  onChange,
  label,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  label: string;
}) {
  return (
    <div className="inline-flex items-center rounded-lg border border-line bg-bg">
      <button
        type="button"
        className="grid size-11 place-items-center text-fg disabled:opacity-40"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        aria-label={`Menos ${label}`}
      >
        <Minus className="size-4" />
      </button>
      <span className="w-8 text-center font-poster text-xl tabular-nums">{value}</span>
      <button
        type="button"
        className="grid size-11 place-items-center text-fg disabled:opacity-40"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        aria-label={`Más ${label}`}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

function Row({ k, v }: { k: string; v: number }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2 text-sm">
      <dt className="min-w-0 text-muted">{k}</dt>
      <dd className="shrink-0 tabular-nums font-semibold text-fg">{ars(v)}</dd>
    </div>
  );
}

function Itinerary({
  plan,
  roundTrip,
  local,
}: {
  plan: ReturnType<typeof buildPlan>;
  roundTrip: boolean;
  local: boolean;
}) {
  if (local || !plan.outbound) {
    return <p className="mt-2 text-sm text-muted">Sin tramo de larga distancia.</p>;
  }
  return (
    <ol className="mt-3 grid gap-2 border-l border-line pl-3 text-sm">
      <li>
        <span className="block font-semibold text-fg">Ida · horario modelo</span>
        <span className="text-muted">
          {cap(when(plan.outbound.depart, "EEE d MMM · HH:mm"))} · {plan.outbound.from}
          <br />
          {cap(when(plan.outbound.arrive, "EEE d MMM · HH:mm"))} · {plan.outbound.to}
        </span>
      </li>
      {roundTrip && plan.inbound ? (
        <li>
          <span className="block font-semibold text-fg">Vuelta · horario modelo</span>
          <span className="text-muted">
            {cap(when(plan.inbound.depart, "EEE d MMM · HH:mm"))} · {plan.inbound.from}
            <br />
            {cap(when(plan.inbound.arrive, "EEE d MMM · HH:mm"))} · {plan.inbound.to}
          </span>
        </li>
      ) : null}
    </ol>
  );
}

function MoneyField({
  label,
  value,
  placeholder,
  disabled,
  onChange,
}: {
  label: string;
  value: number | null;
  placeholder: string;
  disabled?: boolean;
  onChange: (n: number | null) => void;
}) {
  return (
    <label className="block text-sm text-muted">
      {label}
      <input
        className={`${field} mt-1`}
        inputMode="numeric"
        disabled={disabled}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => {
          const digits = e.target.value.replace(/\D/g, "");
          onChange(digits ? Number(digits) : null);
        }}
      />
    </label>
  );
}

function CustomShow({ onCreate }: { onCreate: (show: Show) => void }) {
  const [open, setOpen] = useState(false);
  const [artist, setArtist] = useState("");
  const [date, setDate] = useState("2026-11-07");
  const [doors, setDoors] = useState("21:00");
  const [venueId, setVenueId] = useState(VENUES[0].id);
  const [ticket, setTicket] = useState("25000");
  const [genre, setGenre] = useState("Heavy");
  const [error, setError] = useState("");

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-rust"
      >
        <Plus className="size-4" />
        Cargar un recital real
      </button>
    );
  }

  return (
    <form
      className="mt-3 grid gap-3 rounded-card border border-line bg-surface p-4 sm:grid-cols-2"
      onSubmit={(e) => {
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
          custom: true,
        });
        setArtist("");
        setOpen(false);
      }}
    >
      <label className="text-sm text-muted sm:col-span-2">
        Banda
        <input className={`${field} mt-1`} value={artist} onChange={(e) => setArtist(e.target.value)} />
      </label>
      <label className="text-sm text-muted">
        Fecha
        <input className={`${field} mt-1`} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <label className="text-sm text-muted">
        Puertas
        <input className={`${field} mt-1`} type="time" value={doors} onChange={(e) => setDoors(e.target.value)} />
      </label>
      <label className="text-sm text-muted">
        Venue
        <select className={`${field} mt-1`} value={venueId} onChange={(e) => setVenueId(e.target.value)}>
          {VENUES.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      </label>
      <label className="text-sm text-muted">
        Entrada
        <input
          className={`${field} mt-1`}
          inputMode="numeric"
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
        />
      </label>
      <label className="text-sm text-muted sm:col-span-2">
        Estilo
        <input className={`${field} mt-1`} value={genre} onChange={(e) => setGenre(e.target.value)} />
      </label>
      {error ? <p className="text-sm text-heat-5 sm:col-span-2">{error}</p> : null}
      <div className="flex gap-2 sm:col-span-2">
        <button type="submit" className="min-h-11 rounded-lg bg-rust px-4 font-semibold text-rust-ink">
          Agregar a la cartelera
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="min-h-11 rounded-lg border border-line px-4 font-semibold text-fg"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

function SavedRow({
  draft,
  custom,
  onOpen,
  onDelete,
}: {
  draft: Draft;
  custom: Show[];
  onOpen: () => void;
  onDelete: () => void;
}) {
  const resolved = resolveDraft(draft, custom);
  const name =
    draft.label.trim() ||
    `${resolved.show.artist} · ${resolved.city.short} · ${draft.party} pax`;
  return (
    <li className="flex items-center gap-2 rounded-card border border-line bg-surface px-3 py-2">
      <button type="button" onClick={onOpen} className="min-h-11 flex-1 text-left">
        <span className="block font-semibold text-fg">{name}</span>
        <span className="block text-sm text-muted">
          {BUS_CLASS[draft.busClass].label} · {ars(resolved.plan.total)} · {ars(resolved.plan.perPerson)} c/u
        </span>
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="grid size-11 place-items-center text-muted"
        aria-label={`Borrar ${name}`}
      >
        <Trash2 className="size-4" />
      </button>
    </li>
  );
}
