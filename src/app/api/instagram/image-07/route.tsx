/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

// import { NextResponse } from "next/server";
import { SITE_SHORT_NAME, SITE_URL } from "@/lib/metadata";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title"); // The title must contain a maximum of 109 characters
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
        }}
      >
        <img
          alt={title || "Site Short Name"}
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
            width: "100%",
            height: "60%",
            bottom: 0,
            backgroundImage:
              "linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            fontSize: 60,
            color: "white",
            alignItems: "center",
            textAlign: "center",
            width: "90%",
            bottom: "80px",
            marginBottom: "40px",
            fontWeight: 900,
            textShadow:
              "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
            zIndex: 2,
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title || "Site Name"}
        </div>
        <div
          style={{
            position: "absolute",
            top: 90,
            left: 120,
            width: "90px",
            height: "90px",
            zIndex: 1,
            backgroundColor: "#181818",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
        >
          <img
            alt="Logo"
            src={`${SITE_URL}/icon.png`}
            style={{
              width: "140px",
              height: "140px",
              objectFit: "contain",
              borderRadius: "50%",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            width: "180px",
            height: "80px",
            zIndex: 1,
            backgroundColor: "#B22222",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <div
          style={{
            width: "30%",
            bottom: 15,
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
