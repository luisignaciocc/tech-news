/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";

import { SITE_NAME, SITE_SHORT_NAME, SITE_URL } from "@/lib/metadata";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const coverImage = searchParams.get("cover_image");
  const apiKey = searchParams.get("api_key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          paddingTop: 39,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-.02em",
          fontWeight: 700,
          background: "white",
          position: "relative",
        }}
      >
        <div
          style={{
            left: 0,
            right: 0,
            top: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 30,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "10px 0px",
              width: "100%",
              textAlign: "center",
              backgroundColor: "black",
              color: "white",
              lineHeight: 0.6,
            }}
          >
            {SITE_SHORT_NAME}
          </span>
        </div>
        <img
          alt={title || SITE_SHORT_NAME}
          height={200}
          src={coverImage || `${SITE_URL}/icon.png`}
          style={{
            height: "80%",
          }}
        />
        <div
          style={{
            fontSize: 36,
            color: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            padding: 16,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            background: "black",
          }}
        >
          {title || SITE_NAME}
          <div
            style={{
              position: "absolute",
              bottom: 208,
              left: 0,
              right: 0,
              height: "200%",
              background: "linear-gradient(to top, black, transparent)",
            }}
          />
        </div>
      </div>
    ),
    {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=3600",
      },
      width: 1080,
      height: 1080,
    },
  );
}
