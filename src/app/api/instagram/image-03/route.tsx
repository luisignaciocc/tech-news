/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

// import { NextResponse } from "next/server";
import { SITE_NAME, SITE_SHORT_NAME, SITE_URL } from "@/lib/metadata";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title"); // The title must contain a maximum of 94 characters
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
            color: "#cccccc",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "80%",
            bottom: "20px",
            marginBottom: "15px",
            fontWeight: 900,
            zIndex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <div
            style={{
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
        <div
          style={{
            width: "90px",
            height: "90px",
            position: "absolute",
            top: "61%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            borderRadius: "50%",
            backgroundColor: "#181818",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "85%",
              height: "85%",
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
