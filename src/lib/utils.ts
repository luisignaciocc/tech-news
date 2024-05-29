import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const PER_PAGE = 10;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
