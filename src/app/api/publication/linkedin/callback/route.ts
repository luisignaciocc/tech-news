import { NextResponse } from "next/server";

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
// const LINKEDIN_AUTHORIZATION_URL =
//   "https://www.linkedin.com/oauth/v2/authorization";
const LINKEDIN_REDIRECT_URI =
  "http://localhost:3000/api/publication/linkedin/callback";
const LINKEDIN_ACCESS_TOKEN_URL =
  "https://www.linkedin.com/oauth/v2/accessToken";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authorization_code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (!authorization_code) {
    if (error) {
      return NextResponse.json({ error: errorDescription }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "No authorization code found" },
        { status: 500 },
      );
    }
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return NextResponse.json(
      { error: "No Twitter API keys found" },
      { status: 404 },
    );
  }

  const body = {
    grant_type: "authorization_code",
    code: authorization_code,
    redirect_uri: LINKEDIN_REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  const res = await fetch(LINKEDIN_ACCESS_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body).toString(),
  });

  const data: {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;
    scope: "w_organization_social";
  } = await res.json();

  return NextResponse.json({ success: true, data }, { status: 200 });
}
