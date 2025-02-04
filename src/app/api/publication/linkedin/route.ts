import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { SITE_URL } from "@/lib/metadata";
import { notifyProblem } from "@/lib/utils";

export const maxDuration = 60;

const prisma = new PrismaClient();

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = request.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  try {
    const [article] = await Promise.all([
      prisma.post.findFirst({
        where: {
          postedToLinkedin: false,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          excerpt: true,
          slug: true,
        },
      }),
    ]);

    if (!article) {
      return NextResponse.json({ error: "No article found" }, { status: 404 });
    }

    const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
    const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
    const ACESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
    const ORGANIZATION_ID = "104021039";
    const postUrl = `${SITE_URL}/es/posts/${article.slug}`;

    if (!CLIENT_ID || !CLIENT_SECRET || !ACESS_TOKEN) {
      return NextResponse.json(
        { error: "No LinkedIn API keys found" },
        { status: 404 },
      );
    }

    const res = await fetch("https://api.linkedin.com/rest/posts", {
      method: "POST",
      headers: {
        "LinkedIn-Version": "202406",
        "X-Restli-Protocol-Version": "2.0.0",
        Authorization: `Bearer ${ACESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: `urn:li:organization:${ORGANIZATION_ID}`,
        commentary: `📰 ${article.title} \n\n${article.excerpt}`,
        content: {
          article: {
            source: postUrl,
            title: article.title,
            description: article.excerpt,
          },
        },
        visibility: "PUBLIC",
        distribution: {
          feedDistribution: "MAIN_FEED",
          targetEntities: [],
          thirdPartyDistributionChannels: [],
        },
        lifecycleState: "PUBLISHED",
        isReshareDisabledByAuthor: false,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      await notifyProblem("Publishing a new post to LinkedIn", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    const postId = res.headers.get("x-restli-id");

    await prisma.post.update({
      where: {
        id: article.id,
      },
      data: {
        postedToLinkedin: true,
        linkedinPostId: postId,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    await notifyProblem("Publishing a new post to LinkedIn");
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Error al hacer la solicitud a la API: ${error.message}` },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { error: "Error al hacer la solicitud a la API" },
        { status: 500 },
      );
    }
  }
}
