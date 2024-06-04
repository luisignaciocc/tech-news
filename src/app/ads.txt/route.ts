import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    "google.com, pub-2054099836040190, DIRECT, f08c47fec0942fa0",
    {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    },
  );
}
