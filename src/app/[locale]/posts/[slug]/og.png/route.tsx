/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { getPostBySlug, getPostSlugs } from "@/lib/api";
import { SITE_URL } from "@/lib/metadata";

export async function GET(
  req: Request,
  { params }: { params: { slug: string; locale: string } },
) {
  const post = await getPostBySlug(params.slug, params.locale);

  if (!post) {
    return notFound();
  }

  const colors = ["#003366", "#114912", "#3E1D71", "#952812"];

  const color = colors[Math.floor(Math.random() * colors.length)];

  return new ImageResponse(
    (
      <div
        style={{
          paddingTop: 70,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-.02em",
          fontWeight: 700,
          background: "black",
          position: "relative",
        }}
      >
        {post.coverImage && (
          <img
            alt={post.title}
            src={post.coverImage}
            style={{
              width: "100%",
              height: "80%",
              objectFit: "cover",
              marginBottom: 20,
              position: "absolute",
              top: 0,
              zIndex: 1,
            }}
          />
        )}
        {/* Cuadro de texto en la parte inferior */}
        <div
          style={{
            position: "absolute",
            bottom: "55px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            height: "195px",
            backgroundColor: color,
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            textShadow:
              "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          <span style={{ fontSize: 40, color: "white", fontWeight: 900 }}>
            {post.title}
          </span>
        </div>
        {/* Texto de URL en la parte inferior de la imagen */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            color: "white",
            textAlign: "center",
            display: "flex",
          }}
        >
          <span style={{ fontSize: 26 }}>
            ENTÉRATE DE TODOS LOS DETALLES EN
            <img
              src="data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' fill='white'/%3E%3C/svg%3E"
              alt="Flecha"
              style={{
                width: "1.5em",
                height: "1em",
                marginRight: "-1em",
                marginTop: "0.2em",
              }}
            />
            <img
              src="data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' fill='white'/%3E%3C/svg%3E"
              alt="Flecha"
              style={{
                width: "1.5em",
                height: "1em",
                marginRight: "-1em",
                marginTop: "0.2em",
              }}
            />
            <img
              src="data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' fill='white'/%3E%3C/svg%3E"
              alt="Flecha"
              style={{
                width: "1.5em",
                height: "1em",
                marginTop: "0.2em",
              }}
            />
            {SITE_URL}
          </span>
        </div>
      </div>
    ),
    {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=3600",
      },
      width: 1200,
      height: 630,
    },
  );
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs({ limit: 100 });

  return slugs.map(({ slug }) => ({
    slug,
  }));
}
