import type { SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement> & { variant?: "full" | "mark" | "stacked"; monochrome?: boolean };

export function Logo({ variant = "full", monochrome = false, className = "", ...props }: LogoProps) {
  const width = variant === "mark" ? 52 : variant === "stacked" ? 150 : 210;
  const height = variant === "stacked" ? 92 : 52;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Press Play" className={className} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="3">
        {!monochrome && <rect x="8" y="9" width="35" height="35" rx="11" transform="translate(2 1)" stroke="rgb(var(--terracotta))" />}
        {!monochrome && <rect x="8" y="9" width="35" height="35" rx="11" transform="translate(-2 -1)" stroke="rgb(var(--sage))" />}
        <rect x="8" y="9" width="35" height="35" rx="11" />
      </g>
      <path d="M21 17l15 9-15 9z" fill={monochrome ? "currentColor" : "rgb(var(--butter))"} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {variant !== "mark" && <text x={variant === "stacked" ? 4 : 60} y={variant === "stacked" ? 78 : 36} fill="currentColor" fontFamily="var(--font-display)" fontSize="30" fontWeight="900" letterSpacing="-1.8">PRESS/PLAY</text>}
    </svg>
  );
}
