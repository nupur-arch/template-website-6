import type { SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement> & { variant?: "full" | "mark" | "stacked"; monochrome?: boolean };

export function Logo({ variant = "full", monochrome = false, className = "", ...props }: LogoProps) {
  const width = variant === "mark" ? 52 : variant === "stacked" ? 150 : 210;
  const height = variant === "stacked" ? 92 : 52;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Press Play" className={className} {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="4">
        {!monochrome && <path d="M8 9h35v35H8z" transform="translate(3 1)" stroke="rgb(var(--pink))" />}
        {!monochrome && <path d="M8 9h35v35H8z" transform="translate(-3 -1)" stroke="rgb(var(--riso))" />}
        <path d="M8 9h35v35H8z" />
      </g>
      <path d="M21 17l15 9-15 9z" fill={monochrome ? "currentColor" : "rgb(var(--sun))"} stroke="currentColor" strokeWidth="3" />
      {variant !== "mark" && <text x={variant === "stacked" ? 4 : 60} y={variant === "stacked" ? 78 : 36} fill="currentColor" fontFamily="var(--font-display)" fontSize="30" fontWeight="900" letterSpacing="-1.8">PRESS/PLAY</text>}
    </svg>
  );
}
