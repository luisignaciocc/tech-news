import { NextResponse } from "next/server";

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_AUTHORIZATION_URL =
  "https://www.linkedin.com/oauth/v2/authorization";
const LINKEDIN_REDIRECT_URI =
  "http://localhost:3000/api/publication/linkedin/callback";

export async function GET(_request: Request): Promise<NextResponse> {
  const state = Buffer.from(
    Math.round(Math.random() * Date.now()).toString(),
  ).toString("hex");
  const scope = encodeURIComponent(
    "w_organization_social rw_organization_admin",
  );

  const authUrl = `${LINKEDIN_AUTHORIZATION_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT_URI)}&state=${state}&scope=${scope}`;

  return NextResponse.redirect(authUrl);
}
