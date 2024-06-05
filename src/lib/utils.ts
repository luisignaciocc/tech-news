import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const PER_PAGE = 30;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function notifyProblem(type: string, error?: unknown) {
  const API_KEY = process.env.CALLMEBOT_API_KEY;
  const PHONE = process.env.WHATSAPP_PHONE;

  if (!API_KEY || !PHONE) {
    console.error("No whatsapp API keys found");
    throw new Error("No whatsapp API keys found");
  }

  if (error) {
    console.error(error);
  }

  await fetch(
    `https://api.callmebot.com/whatsapp.php?phone=${PHONE}&text=${encodeURIComponent(
      `A proble occurred while ${type}.${error ? ` Check the logs for more information.` : ""}`,
    )}&apikey=${API_KEY}`,
  );
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
export function toBase62(num: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  while (num > 0) {
    result = chars[num % 62] + result;
    num = Math.floor(num / 62);
  }
  return result;
}
