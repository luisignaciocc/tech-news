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
          flexDirection: "column",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
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
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            paddingTop: "10px",
            paddingBottom: "10px",
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
          <img
            alt="Site Icon"
            src="http://localhost:3000/icon.png"
            style={{
              width: "70px",
              height: "70px",
              zIndex: 1,
            }}
          />
        </div>
        <img
          alt={title || SITE_SHORT_NAME}
          height={200}
          src={coverImage || `${SITE_URL}/icon.png`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            fontSize: 32,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "70%",
            bottom: "20px",
            marginBottom: "40px",
            fontWeight: 900,
            textShadow:
              "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
          }}
        >
          {title || SITE_NAME}
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
