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
          background: "white",
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
        <div
          style={{
            left: 42,
            top: 30,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: 16,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "10px 16px",
              width: "auto",
              textAlign: "center",
              backgroundColor: "black",
              color: "white",
              lineHeight: 0.6,
            }}
          >
            {SITE_URL}
          </span>
        </div>
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
