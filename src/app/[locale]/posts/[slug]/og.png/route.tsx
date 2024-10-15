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
          position: "relative", // Asegúrate de que el contenedor sea relativo
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
              zIndex: 1, // Imagen detrás del texto
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
            zIndex: 2, // Asegúrate de que esté en frente
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

        <div
          style={{
            fontSize: 24,
            color: "black",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 2, // Asegúrate de que esté en frente
          }}
        >
          {post.title}
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
