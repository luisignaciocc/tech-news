/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

// import { NextResponse } from "next/server";
import { SITE_NAME, SITE_SHORT_NAME, SITE_URL } from "@/lib/metadata";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const coverImage = searchParams.get("cover_image");
  // const apiKey = searchParams.get("api_key");

  // if (apiKey !== process.env.API_KEY) {
  //   return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  // }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          backgroundColor: "#181818",
        }}
      >
        <img
          alt={title || SITE_SHORT_NAME}
          height={1080}
          src={coverImage || `${SITE_URL}/icon.png`}
          style={{
            width: "100%",
            height: "65%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            fontSize: 56,
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "80%",
            bottom: "20px",
            marginBottom: "40px",
            fontWeight: 900,
            textShadow:
              "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
            zIndex: 1,
          }}
        >
          {title || SITE_NAME}
        </div>
        <img
          alt="Logo"
          src={`${SITE_URL}/icon.png`}
          style={{
            width: "70px",
            height: "70px",
            position: "absolute",
            top: "62%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            borderRadius: "50%",
          }}
        />
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
