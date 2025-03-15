/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

import { SITE_SHORT_NAME, SITE_URL } from "@/lib/metadata";

export async function GET() {
  const colors = ["#003366", "#114912", "#3E1D71", "#952812"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-.02em",
          fontWeight: 700,
          background: color,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Elementos decorativos de fondo */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "50%",
            height: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            right: "-10%",
            width: "70%",
            height: "70%",
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "50%",
          }}
        />

        {/* Logo grande centrado */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
            position: "relative",
            width: "140px",
            height: "140px",
            background: "white",
            borderRadius: "50%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <img
            alt="Logo"
            src={`${SITE_URL}/icon-accent.png`}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              padding: "0px",
            }}
          />
        </div>

        {/* Título principal */}
        <div
          style={{
            fontSize: 72,
            lineHeight: "1.2",
            color: "white",
            fontWeight: 900,
            textAlign: "center",
            marginBottom: "20px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          {SITE_SHORT_NAME}
        </div>

        {/* Subtítulo */}
        <div
          style={{
            fontSize: 32,
            color: "white",
            opacity: 0.9,
            fontWeight: 500,
            textAlign: "center",
            maxWidth: "80%",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          Tu fuente diaria de noticias sobre tecnología y desarrollo
        </div>

        {/* Elementos decorativos tecnológicos */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "40px",
              height: "40px",
              border: "3px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              transform: `rotate(${i * 60}deg) translate(${250 + i * 20}px) rotate(-${i * 60}deg)`,
            }}
          />
        ))}

        {/* URL en la parte inferior */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            fontSize: 24,
            color: "white",
            opacity: 0.9,
            fontWeight: 600,
            textAlign: "center",
            background: "rgba(0, 0, 0, 0.2)",
            padding: "10px 30px",
            borderRadius: "30px",
          }}
        >
          {SITE_URL}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
