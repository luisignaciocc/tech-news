import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Tecnología";

  const bgColorsHex = [
    "#ffeeee",
    "#ffeef8",
    "#fbeeff",
    "#eef1ff",
    "#eefcff",
    "#eefff8",
    "#eeffee",
    "#fcffee",
    "#fffaee",
    "#fff5ee",
  ];

  const randomBgColor =
    bgColorsHex[Math.floor(Math.random() * bgColorsHex.length)];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: randomBgColor,
        }}
      >
        <div tw="flex h-full">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
              <span>{title}</span>
              <span tw="text-indigo-600">Bocono Labs</span>
            </h2>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
