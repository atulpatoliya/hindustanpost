import { NextResponse } from "next/server";
import getSignedUrl from "../../../lib/getSignedUrl";

const BASE_BACKEND_URL = process.env.NEWS_BACKEND_BASE_URL;

export async function GET(req: Request) {
  try {
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();
    let baseURL;
    // If user requests `/api/post/<id>` -> single speech post mode
    if (id && id !== "post") {
      baseURL = `${BASE_BACKEND_URL}/api/v1/signed-url/post/${id}`;
    } else {
      // Default existing functionality (list published posts)
      baseURL = `${BASE_BACKEND_URL}/api/v1/signed-url/post?status=published`;
    }

    const signedUrl = getSignedUrl(baseURL, 60);

    const response = await fetch(signedUrl, { cache: "no-store" });
    const data = await response.json();

    return NextResponse.json({ data: data?.data });
  } catch (err: any) {
    console.error("Error in /api/post route:", err);
    return NextResponse.json(
      { error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
