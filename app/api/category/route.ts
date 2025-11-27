import { NextResponse } from "next/server";
import getSignedUrl from "../../../lib/getSignedUrl";
export const dynamic = 'force-dynamic'; 

const BASE_BACKEND_URL = process.env.NEWS_BACKEND_BASE_URL;

export async function GET() {
  try {
    const baseURL = `${BASE_BACKEND_URL}/api/v1/signed-url/menus`;
    const signedUrl = getSignedUrl(baseURL, 60);

    const response = await fetch(signedUrl, { cache: "no-store" });
    const data = await response.json();
    return NextResponse.json({ data: data?.data });
  } catch (err: any) {
    console.error("Error in /api/category route:", err);
    return NextResponse.json(
      { error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
