import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { parseString } from "xml2js";

import { notifyProblem } from "@/lib/utils";

export async function POST(_request: Request) {
  try {
    const prisma = new PrismaClient();

    const oldestNewsSource = await prisma.newsSource.findFirst({
      where: {
        isActive: true,
      },
      orderBy: {
        lastUpdateAt: "asc",
      },
      select: {
        id: true,
        url: true,
        lastUpdateAt: true,
      },
    });

    if (!oldestNewsSource) {
      return NextResponse.json(
        { error: "No se encontró una fuente de noticias valida" },
        { status: 404 },
      );
    }

    const url = `https://news.google.com/rss/search?q=site:${oldestNewsSource.url}+when:2d&hl=en-IN&gl=IN&ceid=IN:en`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      await notifyProblem("Pulling news from Brave Search", error);
      return NextResponse.json({ error: error }, { status: 500 });
    }

    const xmlData = await response.text();

    return new Promise((resolve, reject) => {
      parseString(xmlData, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const newsItems = data.rss.channel[0].item;
          resolve(NextResponse.json(newsItems));
        }
      });
    }).catch((err) => {
      return NextResponse.json(
        { error: `Error procesando datos XML: ${err}` },
        { status: 500 },
      );
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Error al realizar solicitud a la API: ${error}` },
      { status: 500 },
    );
  }
}
