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
            width: "90%",
            height: "250px",
            bottom: "20px",
            marginBottom: "8%",
            fontWeight: 900,
            background: "#003366",
            padding: "20px",
            textShadow:
              "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
            zIndex: 1,
          }}
        >
          {title || SITE_NAME}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "350px",
            right: "-100px",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            width: "380px",
            height: "80px",
            backgroundColor: "white",
            zIndex: 2,
          }}
        >
          <img
            alt="Logo"
            src={`${SITE_URL}/icon-accent.png`}
            style={{
              width: "90px",
              height: "90px",
              left: 0,
              objectFit: "contain",
            }}
          />
          <div style={{ marginLeft: "-10px", fontSize: 40 }}>| TECNOLOGÍA</div>
          <div
            style={{
              position: "absolute",
              bottom: "-10px",
              right: "30px",
              width: "30px",
              height: "30px",
              backgroundColor: "#fff",
              transform: "rotate(45deg)",
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
