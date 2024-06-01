// http://localhost:3000/api/publication/facebook/get-token
import { NextResponse } from "next/server";

// get long lived token first

export async function GET(_request: Request): Promise<NextResponse> {
  const longLivedToken = process.env.FACEBOOK_LONG_LIVE_TOKEN;

  if (!longLivedToken) {
    return NextResponse.json({
      ok: false,
      message: "No se encontró un token de acceso válido.",
    });
  }

  const userId = process.env.FB_USER_ID;

  if (!userId) {
    return NextResponse.json({
      ok: false,
      message: "No se encontró un token de acceso válido.",
    });
  }

  const res = await fetch(
    `https://graph.facebook.com/${userId}/accounts?access_token=${longLivedToken}`,
  );

  const data: {
    access_token: string;
    category: string;
    category_list: [
      {
        id: string;
        name: string;
      },
    ];
    name: string;
    id: string;
    tasks: string[];
  }[] = await res.json();

  return NextResponse.json({ data });
}
