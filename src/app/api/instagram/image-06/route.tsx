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
            top: "150px",
            width: "85%",
            height: "50%",
            objectFit: "cover",
            zIndex: 0,
            borderRadius: "4%",
          }}
        />
        <div
          style={{
            position: "absolute",
            fontSize: 58,
            color: "white",
            alignItems: "center",
            width: "80%",
            bottom: "10px",
            left: "90px",
            marginBottom: "40px",
            fontWeight: 900,
            textShadow:
              "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
            zIndex: 1,
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title || SITE_NAME}
        </div>
        <div
          style={{
            width: "80px",
            height: "80px",
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 2,
            backgroundColor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              overflow: "hidden",
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
