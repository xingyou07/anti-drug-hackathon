import { urgeSurfContent } from '@/content';

const WIDTH = 320;
const HEIGHT = 120;

/**
 * The curve is drawn, not measured. Its only job is to show the rise-and-fall
 * shape the technique teaches; it is explicitly not a claim about how long an
 * urge lasts, which is why no axis is labelled with a number and why
 * `curveNote` is rendered next to it.
 */
function intensityAt(progress: number): number {
  // Rises to a crest at ~35% then decays — a shape, not a data series.
  const rise = Math.pow(Math.min(progress / 0.35, 1), 1.6);
  const fall = progress <= 0.35 ? 1 : Math.pow(1 - (progress - 0.35) / 0.65, 1.5);
  return rise * fall;
}

function buildPath(): string {
  const points: string[] = [];
  for (let i = 0; i <= 100; i += 1) {
    const progress = i / 100;
    const x = progress * WIDTH;
    const y = HEIGHT - intensityAt(progress) * (HEIGHT - 10) - 4;
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(' ');
}

const CURVE_PATH = buildPath();

export function WaveCurve({ progress }: { progress: number }): JSX.Element {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const markerX = clamped * WIDTH;
  const markerY = HEIGHT - intensityAt(clamped) * (HEIGHT - 10) - 4;

  return (
    <figure className="px-4">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label="An illustration of an urge rising to a crest and falling away again."
      >
        <path d={`${CURVE_PATH} L${WIDTH},${HEIGHT} L0,${HEIGHT} Z`} fill="rgb(20 184 166 / 0.14)" />
        <path d={CURVE_PATH} fill="none" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" />
        <line
          x1={markerX}
          y1={markerY}
          x2={markerX}
          y2={HEIGHT}
          stroke="#8595A6"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <circle cx={markerX} cy={markerY} r="6" fill="#0B0F14" stroke="#2DD4BF" strokeWidth="2.5" />
      </svg>
      <figcaption className="mt-2 text-xs leading-relaxed text-subtle">
        {urgeSurfContent.curveNote}
      </figcaption>
    </figure>
  );
}
