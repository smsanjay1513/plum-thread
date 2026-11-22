import { useId } from 'react';

interface BrandLogoProps {
  className?: string;
  onDark?: boolean;
}

export function BrandLogo({ className = 'w-8 h-8', onDark = false }: BrandLogoProps) {
  const maskId = useId();

  const flangeFillClass = onDark
    ? 'fill-[#D98ECA]'
    : 'fill-[#581C4C] dark:fill-[#D98ECA]';
  const coreFillClass = onDark
    ? 'fill-[#9E3D89]'
    : 'fill-[#7A2769] dark:fill-[#8E307B]';
  const tailStrokeClass = onDark
    ? 'stroke-[#F2BFE8]'
    : 'stroke-[#9E3D89] dark:stroke-[#F2BFE8]';

  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="36" height="36" fill="white" />
          {/* Clean negative-space diagonal thread wraps across the plum spool core */}
          <path
            d="M9.5 15.6 L26.5 12.6 M9.2 19.3 L26.8 16.3 M9.5 23.0 L26.5 20.0"
            stroke="black"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </mask>
      </defs>

      {/* Top spool flange */}
      <rect x="7.5" y="6" width="19" height="4.2" rx="2.1" className={flangeFillClass} />

      {/* Wound plum thread barrel */}
      <path
        d="M10.8 11.2 H23.2 C25.2 14.6 25.2 21.4 23.2 24.8 H10.8 C8.8 21.4 8.8 14.6 10.8 11.2 Z"
        className={coreFillClass}
        mask={`url(#${maskId})`}
      />

      {/* Bottom spool flange */}
      <rect x="7.5" y="25.8" width="19" height="4.2" rx="2.1" className={flangeFillClass} />

      {/* Unspooled flowing thread tail */}
      <path
        d="M23.5 22.8 C27.5 23.6 31.2 21.2 31.2 17.5 C31.2 14.6 28.9 12.8 26.8 13.8"
        className={tailStrokeClass}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface BrandLockupProps {
  onDark?: boolean;
}

export function BrandLockup({ onDark = false }: BrandLockupProps) {
  const wordmarkClass = onDark
    ? 'font-display text-lg font-semibold tracking-tight text-white whitespace-nowrap'
    : 'font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap';

  return (
    <a
      href="#top"
      aria-label="Plum & Thread home"
      className="inline-flex items-center gap-2.5 shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#581C4C] dark:focus-visible:ring-[#E29AD3] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
    >
      <BrandLogo className="w-8 h-8 shrink-0" onDark={onDark} />
      <span className={wordmarkClass}>Plum &amp; Thread</span>
    </a>
  );
}
