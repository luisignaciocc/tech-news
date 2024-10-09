import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { NextResponse } from "next/server";
import OAuth from "oauth-1.0a";

import { SITE_URL } from "@/lib/metadata";
import { notifyProblem } from "@/lib/utils";

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
          postedToTwitter: false,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          slug: true,
        },
      }),
    ]);

    if (!article) {
      return NextResponse.json({ error: "No article found" }, { status: 404 });
    }

    const API_KEY = process.env.TWITTER_API_KEY;
    const API_SECRET_KEY = process.env.TWITTER_API_SECRET_KEY;
    const ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
    const ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET;

    if (!API_KEY || !API_SECRET_KEY || !ACCESS_TOKEN || !ACCESS_TOKEN_SECRET) {
      return NextResponse.json(
        { error: "No Twitter API keys found" },
        { status: 404 },
      );
    }

    const endpointURL = `https://api.twitter.com/2/tweets`;
    const postUrl = `${SITE_URL}/es/posts/${article.slug}`;

    const oauth = new OAuth({
      consumer: {
        key: API_KEY,
        secret: API_SECRET_KEY,
      },
      signature_method: "HMAC-SHA1",
      hash_function: (baseString, key) =>
        crypto.createHmac("sha1", key).update(baseString).digest("base64"),
    });

    const token = {
      key: ACCESS_TOKEN,
      secret: ACCESS_TOKEN_SECRET,
    };

    const authHeader = oauth.toHeader(
      oauth.authorize(
        {
          url: endpointURL,
          method: "POST",
        },
        token,
      ),
    );

    const text = `📰 ${article.title}\n\n${postUrl}`;

    const response = await fetch(endpointURL, {
      method: "POST",
      headers: {
        Authorization: authHeader["Authorization"],
        "user-agent": "v2CreateTweetJS",
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      await notifyProblem("Publishing a new post to Twitter", error);
      return NextResponse.json(
        { error: "Error al hacer la solicitud a la API" },
        { status: 500 },
      );
    }

    const {
      data: { id },
    } = await response.json();

    await prisma.post.update({
      where: {
        id: article.id,
      },
      data: {
        postedToTwitter: true,
        tweetId: id,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    await notifyProblem("Publishing a new post to Twitter");
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
