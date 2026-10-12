import React from 'react';

const HEX = '50,6 90,28 90,72 50,94 10,72 10,28';

/**
 * SpecCheckBadge: flat navy hexagon (guard), connected nodes (knowledge graph),
 * teal check (verified). No gradients or glow, so it stays crisp at any size.
 */
export function SpecCheckBadge({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SPECcheck.AI logo"
      className={`inline-block shrink-0 ${className}`}
    >
      <polygon points={HEX} fill="#0B1F3A" strokeLinejoin="round" />

      <g stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.7">
        <line x1="50" y1="36" x2="31" y2="69" />
        <line x1="50" y1="36" x2="71" y2="70" />
        <line x1="31" y1="69" x2="71" y2="70" />
      </g>

      <circle cx="50" cy="36" r="6" fill="#FFFFFF" />
      <circle cx="31" cy="69" r="6" fill="#FFFFFF" />

      <circle cx="71" cy="70" r="14" fill="#0A8A89" stroke="#0B1F3A" strokeWidth="2.5" />
      <path
        d="M65.5 70.5 L69.5 74.5 L77 66"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Full brand lockup: badge + wordmark (+ optional tagline). */
export function SpecCheckLogo({ size = 46, showSubtitle = true, className = '' }) {
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      <SpecCheckBadge size={size} />
      <div className="flex flex-col">
        <div className="font-display text-2xl font-bold tracking-tight leading-none text-ink">
          SPEC<span className="text-accent">check</span>
          <span className="font-mono font-medium">.AI</span>
        </div>
        {showSubtitle && (
          <span className="mt-1.5 text-[9px] font-medium tracking-[0.24em] uppercase text-muted">
            Engineering Intelligence Platform
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * SpecCheckWatermark: the same mark as one flat shape.
 * Colour comes from `currentColor`, so the parent sets colour and opacity,
 * e.g. className="w-[640px] text-ink opacity-[0.05]".
 * The graph is drawn in the canvas colour so it reads as a cut-out.
 */
export function SpecCheckWatermark({ className = '' }) {
  const cut = { fill: 'var(--color-canvas)' };
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <polygon points={HEX} fill="currentColor" strokeLinejoin="round" />
      <g style={{ stroke: 'var(--color-canvas)' }} strokeWidth="3.5" strokeLinecap="round">
        <line x1="50" y1="36" x2="31" y2="69" />
        <line x1="50" y1="36" x2="71" y2="70" />
        <line x1="31" y1="69" x2="71" y2="70" />
      </g>
      <circle cx="50" cy="36" r="6" style={cut} />
      <circle cx="31" cy="69" r="6" style={cut} />
      <circle cx="71" cy="70" r="14" style={cut} />
      <path
        d="M65.5 70.5 L69.5 74.5 L77 66"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}