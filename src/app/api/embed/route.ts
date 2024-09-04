import { NextResponse } from "next/server";
import OpenAI from "openai";

export const maxDuration = 60;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get("word");

  if (!process.env.EMBEDDINGS_ENDPOINT) {
    return NextResponse.json(
      { error: "Endpoint not configured" },
      { status: 400 },
    );
  }

  if (!word) {
    return NextResponse.json({ error: "Missing word" }, { status: 400 });
  }

  try {
    const embeddingsData = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: word,
      encoding_format: "float",
    });

    const embedding = embeddingsData.data[0].embedding;

    return NextResponse.json({ embedding });
  } catch (error: unknown) {
    console.error("Error generating embeddings", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
