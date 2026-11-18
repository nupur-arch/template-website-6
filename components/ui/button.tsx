import type { ButtonHTMLAttributes } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`lift rounded-full border border-line bg-terracotta px-4 py-2 font-bold uppercase text-accent-ink shadow-sm transition-[transform,box-shadow] ${className}`} {...props} />;
}
