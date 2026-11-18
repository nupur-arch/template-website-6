"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Logo } from "./logo";

type SafeImageProps = Omit<ImageProps, "src"> & { src?: string | null; category?: string };

export function SafeImage({ src, alt, category = "Dispatch", className = "", ...props }: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return (
    <div role="img" aria-label={`${alt} — image unavailable`} className={`halftone relative grid overflow-hidden bg-sun text-ink ${className}`}>
      <div className="m-auto -rotate-3 border-2 border-ink bg-paper/90 p-4 text-center">
        <Logo variant="mark" className="mx-auto h-10 w-10" />
        <span className="mt-2 block text-xs font-bold uppercase">{category}</span>
      </div>
    </div>
  );
  return <Image src={src} alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
