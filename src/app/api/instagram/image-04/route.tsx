/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

// import { NextResponse } from "next/server";
import { SITE_NAME, SITE_SHORT_NAME, SITE_URL } from "@/lib/metadata";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title"); // The title must contain a maximum of 116 characters
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
          <div
            style={{
              position: "absolute",
              width: "65px",
              height: "65px",
              top: "-35px",
              left: "20px",
              zIndex: 2,
              borderRadius: "50%",
              backgroundColor: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                alt="Logo"
                src={`${SITE_URL}/icon.png`}
                style={{
                  width: "90",
                  height: "90",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
          <div
            style={{
              left: "20px",
              display: "-webkit-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
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
