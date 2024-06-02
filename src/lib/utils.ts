import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const PER_PAGE = 30;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function notifyProblem(type: string, error: unknown) {
  const API_KEY = process.env.CALLMEBOT_API_KEY_IMPORTANT;
  const PHONE = process.env.WHATSAPP_PHONE_IMPORTANT;

  if (!API_KEY || !PHONE) {
    console.error("No whatsapp API keys found");
    throw new Error("No whatsapp API keys found");
  }

  console.error(error);
  await fetch(
    `https://api.callmebot.com/whatsapp.php?phone=${PHONE}&text=${encodeURIComponent(
      `A proble occurred while Publishing the ${type} post. Check the logs for more information.`,
    )}&apikey=${API_KEY}`,
  );
}
