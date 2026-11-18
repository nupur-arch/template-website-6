import type { ButtonHTMLAttributes } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`lift border-2 border-ink bg-sun px-4 py-2 font-bold uppercase transition-[transform,box-shadow] ${className}`} {...props} />;
}
