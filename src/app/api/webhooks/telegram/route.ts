// curl -X POST https://api.telegram.org/bot<YOUR-BOT-TOKEN>/setWebhook -H "Content-type: application/json" -d '{"url": "https://project-name.username.vercel.app/api/webhook"}'

import { NextResponse } from "next/server";

import { webhook } from "@/lib/telegram";

export async function POST(req: Request): Promise<NextResponse> {
  await webhook(req);
  return NextResponse.json({ success: true }, { status: 200 });
}
