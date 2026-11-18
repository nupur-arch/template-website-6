"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Logo } from "./logo";

type SafeImageProps = Omit<ImageProps, "src"> & { src?: string | null; category?: string };

export function SafeImage({ src, alt, category = "Dispatch", className = "", ...props }: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return (
    <div role="img" aria-label={`${alt} — image unavailable`} className={`halftone relative grid overflow-hidden rounded-[24px] bg-sage text-ink ${className}`}>
      <div className="m-auto -rotate-2 rounded-[24px] border border-line bg-surface/90 p-4 text-center shadow-lg">
        <Logo variant="mark" className="mx-auto h-10 w-10" />
        <span className="mt-2 block text-xs font-bold uppercase">{category}</span>
      </div>
    </div>
  );
  return <Image src={src} alt={alt} className={`rounded-[24px] ${className}`} onError={() => setFailed(true)} {...props} />;
}
