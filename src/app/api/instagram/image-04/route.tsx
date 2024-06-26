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
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "black",
        }}
      >
        <img
          alt={title || SITE_SHORT_NAME}
          height={1080}
          src={coverImage || `${SITE_URL}/icon.png`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            fontSize: 50,
            color: "white",
            display: "flex",
            alignItems: "center",
            width: "85%",
            bottom: "20px",
            marginBottom: "8%",
            fontWeight: 900,
            background: "linear-gradient(to bottom, #2c2c2c, #a0a0a0)",
            padding: "20px",
            border: "2px solid white",
            borderRadius: "8px",
            textShadow:
              "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
            zIndex: 1,
          }}
        >
          <img
            alt="Logo"
            src={`${SITE_URL}/icon.png`}
            style={{
              width: "50px",
              height: "50px",
              top: "-25px",
              marginRight: "20px",
              position: "absolute",
              left: "20px",
              zIndex: 3,
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              left: "20px",
            }}
          >
            {title || SITE_NAME}
          </div>
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
