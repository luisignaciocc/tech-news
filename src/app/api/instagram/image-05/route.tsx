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
        <div
          style={{
            backgroundColor: "#181818",
            width: "90%",
            height: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 60,
              color: "#cccccc",
              fontWeight: 900,
            }}
          >
            {title || SITE_NAME}
          </div>
        </div>
        <img
          alt={title || SITE_SHORT_NAME}
          height={1080}
          src={coverImage || `${SITE_URL}/icon.png`}
          style={{
            width: "100%",
            height: "70%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-170px",
            right: "-170px",
            width: "300px",
            height: "300px",
            zIndex: 1,
            backgroundColor: "#181818",
            transform: "rotate(45deg)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              left: "-100px",
              top: "-5px",
              width: "25%",
              height: "25%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              borderRadius: "50%",
            }}
          >
            <img
              alt="Logo"
              src={`${SITE_URL}/icon.png`}
              style={{
                width: "110px",
                height: "110px",
                objectFit: "contain",
                borderRadius: "50%",
              }}
            />
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
