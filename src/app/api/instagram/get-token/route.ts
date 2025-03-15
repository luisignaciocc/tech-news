// http://localhost:3000/api/instagram/get-token?slt=EAAGBo1mosPsBO4ZC0VAxtOLOHZCT7sekgml3FCGOOG5RDJIXqPjuZBPvpZBsVj6ZBtc8lUC3OegZBnUSLnDD3XZB9fn4HWMMoZARjzHHXsvFGzQsyEaXsaEtovwBgtxSGnvMOCPLy8mKVuTh7KTxOLmW0khggwItvOLHZCwqvEoJ9v2CxjGIT41gaGHUOX9XmFMRrwmQPagqlaXxFIQj8Oq6MomuVRhDGEzdNYNMgb1pMzL4ZD
// get short lived token on https://developers.facebook.com/tools/explorer/
import { NextResponse } from "next/server";

// permissions
// pages_show_list
// ads_management
// business_management
// instagram_basic
// instagram_manage_comments
// instagram_manage_insights
// instagram_content_publish
// pages_read_engagement
// pages_manage_posts

// to get ig account id first -> /me/accounts -> get ig account id -> /{ig_account_id}?fields=instagram_business_account -> get ig business account id -> /{ig_business_account_id}?fields=instagram_accounts -> get ig account id

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const shortLivedToken = searchParams.get("slt");

  if (!shortLivedToken) {
    return NextResponse.json({
      ok: false,
      message: "No se encontró un token de acceso válido.",
    });
  }

  const apiVersion = process.env.FACEBOOK_API_VERSION;
  const clientId = process.env.FACEBOOK_CLIENT_ID;
  const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;

  if (!apiVersion || !clientId || !clientSecret) {
    return NextResponse.json({
      ok: false,
      message: "No se encontró un token de acceso válido.",
    });
  }

  const res = await fetch(
    `https://graph.facebook.com/${apiVersion}/oauth/access_token?grant_type=fb_exchange_token&client_id=${clientId}&client_secret=${clientSecret}&fb_exchange_token=${shortLivedToken}`,
  );

  const data: {
    access_token: string;
    token_type: string;
  } = await res.json();

  return NextResponse.json({ data });
}
