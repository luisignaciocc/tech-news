/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { getPostBySlug, getPostSlugs } from "@/lib/api";
import { SITE_URL } from "@/lib/metadata";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const post = await getPostBySlug(params.slug);

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
        }}
      >
        <div
          style={{
            left: 42,
            top: 30,
            position: "absolute",
            display: "flex",
            alignItems: "center",
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
          }}
        >
          {post.title}
        </div>
        {post.coverImage && (
          <img
            alt={post.title}
            height={200}
            src={post.coverImage}
            style={{
              height: "80%",
              border: "10px solid white",
              marginBottom: 20,
            }}
          />
        )}
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
  const slugs = await getPostSlugs();

  return slugs.map(({ slug }) => ({
    slug,
  }));
}
