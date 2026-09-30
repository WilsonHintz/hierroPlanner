import { CITIES } from "@/data/catalog";
import { CITY_POINTS, MAP_H, MAP_PROVINCES, MAP_W } from "@/data/argentina-map";

const ORIGIN_PROVINCES: Record<string, string[]> = {
  amba: ["caba", "buenos-aires"],
  cba: ["cordoba"],
  rosario: ["santa-fe"],
  mendoza: ["mendoza"],
  tucuman: ["tucuman"],
  laplata: ["buenos-aires"],
  salta: ["salta"],
  mdq: ["buenos-aires"],
  neuquen: ["neuquen", "rio-negro"],
  sanjuan: ["san-juan"],
};

const BOW_SIGN: Record<string, number> = {
  amba: 1,
  laplata: -1,
  mdq: 0.7,
  rosario: -1,
  mendoza: 1,
  tucuman: -0.75,
  salta: 0.85,
  neuquen: -1,
  sanjuan: 1,
};

function routePath(x1: number, y1: number, x2: number, y2: number, sign: number): string | null {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 8) return null;
  const bow = Math.min(40, Math.max(12, len * 0.16)) * sign;
  const ux = dx / len;
  const uy = dy / len;
  const mx = (x1 + x2) / 2 - uy * bow;
  const my = (y1 + y2) / 2 + ux * bow;
  return `M ${x1} ${y1} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x2} ${y2}`;
}

function placeLabel(text: string, x: number, y: number, otherX: number, otherY: number) {
  const w = text.length * 7.6;
  const dx = x - otherX;
  const dy = y - otherY;
  const len = Math.hypot(dx, dy) || 1;
  const ox = (dx / len) * 18;
  const oy = (dy / len) * 16;
  let anchor: "start" | "end" | "middle" =
    Math.abs(ox) < 6 ? "middle" : ox > 0 ? "start" : "end";
  let lx = x + ox;
  let ly = y + oy;
  const left = anchor === "start" ? lx : anchor === "end" ? lx - w : lx - w / 2;
  const right = left + w;
  const pad = 8;
  if (left < pad || right > MAP_W - pad) {
    anchor = "middle";
    lx = Math.min(MAP_W - pad - w / 2, Math.max(pad + w / 2, x));
    ly = oy >= 0 ? y + 22 : y - 20;
  }
  ly = Math.min(MAP_H - 8, Math.max(16, ly));
  return { lx, ly, anchor };
}

export function ArgentinaMap({ cityId }: { cityId: string }) {
  const originIds = ORIGIN_PROVINCES[cityId] ?? [];
  const local = cityId === "cba";
  const city = CITIES.find((item) => item.id === cityId);
  const origin = CITY_POINTS[cityId];
  const dest = CITY_POINTS.cba;
  const label = city?.short ?? "Origen";
  const route =
    local || !origin || !dest
      ? null
      : routePath(origin.x, origin.y, dest.x, dest.y, BOW_SIGN[cityId] ?? 1);
  const originLabel =
    origin && dest && !local ? placeLabel(label, origin.x, origin.y, dest.x, dest.y) : null;
  const destLabel =
    dest && origin
      ? placeLabel("Córdoba", dest.x, dest.y, local ? dest.x : origin.x, local ? dest.y - 40 : origin.y)
      : null;
  const caption = local
    ? "Estás en Córdoba. El punto marca la ciudad."
    : `La flecha sale de ${label} y llega a la ciudad de Córdoba.`;

  const plain = MAP_PROVINCES.filter((p) => p.id !== "cordoba" && !originIds.includes(p.id));
  const highlighted = MAP_PROVINCES.filter((p) => !local && originIds.includes(p.id));
  const cordoba = MAP_PROVINCES.find((p) => p.id === "cordoba");

  return (
    <figure className="mt-4 min-w-0">
      <figcaption className="mb-2 text-sm text-muted">{caption}</figcaption>
      <div className="overflow-hidden rounded-card border border-line bg-bg">
        <svg
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          className="ar-map block h-auto w-full"
          role="img"
          aria-label={caption}
        >
          <defs>
            <marker
              id="hierro-arrow"
              markerUnits="userSpaceOnUse"
              markerWidth="18"
              markerHeight="16"
              refX="17"
              refY="8"
              orient="auto"
            >
              <path d="M1,1 L17,8 L1,15 Z" className="arrow-head" />
            </marker>
          </defs>
          {plain.map((province) => (
            <path key={province.id} d={province.d} className="prov" />
          ))}
          {cordoba ? <path d={cordoba.d} className="prov is-dest" /> : null}
          {highlighted.map((province) => (
            <path key={province.id} d={province.d} className="prov is-origin" />
          ))}
          {dest ? <circle cx={dest.x} cy={dest.y} r={6.5} className="city-pin is-dest" /> : null}
          {route ? (
            <path key={cityId} d={route} className="route" markerEnd="url(#hierro-arrow)" />
          ) : null}
          {origin && !local ? (
            <circle cx={origin.x} cy={origin.y} r={5} className="city-pin is-origin" />
          ) : null}
          {originLabel ? (
            <text
              x={originLabel.lx}
              y={originLabel.ly}
              textAnchor={originLabel.anchor}
              className="city-label"
              fontSize={14}
              strokeWidth={3.5}
              paintOrder="stroke fill"
            >
              {label}
            </text>
          ) : null}
          {destLabel ? (
            <text
              x={destLabel.lx}
              y={destLabel.ly}
              textAnchor={destLabel.anchor}
              className="city-label"
              fontSize={14}
              strokeWidth={3.5}
              paintOrder="stroke fill"
            >
              Córdoba
            </text>
          ) : null}
        </svg>
      </div>
      <p className="mt-2 text-sm text-faint">
        La flecha une la ciudad de origen con la ciudad de Córdoba. Límites: Instituto Geográfico
        Nacional.
      </p>
    </figure>
  );
}
