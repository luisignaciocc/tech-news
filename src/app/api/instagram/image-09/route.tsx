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
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            position: "absolute",
            fontSize: 56,
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
            top: "80px",
            marginTop: "40px",
            fontWeight: 900,
            zIndex: 1,
          }}
        >
          {title || SITE_NAME}
        </div>
        <div
          style={{
            width: "90px",
            height: "90px",
            position: "absolute",
            top: "30px",
            right: "30px",
            transform: "translateX(-50%)",
            zIndex: 1,
            borderRadius: "50%",
            backgroundColor: "black",
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
        <div
          style={{
            width: "90%",
            top: "370px",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <span
            style={{
              fontSize: 30,
              display: "flex",
              flexWrap: "wrap",
              padding: "10px 0px",
              width: "100%",
              backgroundColor: "black",
              color: "white",
              lineHeight: 0.6,
            }}
          >
            {SITE_SHORT_NAME}
          </span>
          <div
            style={{
              width: "80%",
              height: "2px",
              backgroundColor: "white",
              marginTop: "10px",
              marginRight: "40px",
              justifyContent: "flex-end",
            }}
          />
        </div>
        <img
          alt={title || SITE_SHORT_NAME}
          height={1080}
          src={coverImage || `${SITE_URL}/icon.png`}
          style={{
            width: "100%",
            height: "60%",
            objectFit: "cover",
            zIndex: 0,
            position: "absolute",
            bottom: 0,
          }}
        />
        <span
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "50px",
            height: "50px",
            backgroundColor: "#ff9500",
            top: "60px",
            left: "50px",
            position: "absolute",
            alignItems: "center",
            justifyContent: "flex-start",
            borderRadius: "50%",
          }}
        />
        <span
          style={{
            fontSize: 30,
            display: "flex",
            flexWrap: "wrap",
            width: "200px",
            height: "50px",
            backgroundColor: "#ff9500",
            top: "60px",
            left: "120px",
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
            borderRadius: "25px",
          }}
        >
          Tecnología
        </span>
        <span
          style={{
            fontSize: 30,
            display: "flex",
            flexWrap: "wrap",
            width: "320px",
            height: "50px",
            backgroundColor: "black",
            top: "60px",
            left: "350px",
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            borderRadius: "25px",
            border: "2px solid white",
          }}
        >
          {new Date().toLocaleString("es-ES", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
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
