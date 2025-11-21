import { NextResponse } from "next/server";
import getSignedUrl from "@/lib/getSignedUrl";

const BASE_BACKEND_URL = process.env.NEWS_BACKEND_BASE_URL;
export const dynamic = "force-dynamic";
export const revalidate = 0;

type CategoryRouteParams = Promise<{ slug: string }>;

export async function GET(
  _req: Request,
  context: { params: CategoryRouteParams }
) {
  try {
    const { slug: rawSlug } = await context.params;
    const slug = decodeURIComponent(rawSlug || "").toLowerCase();

    const baseURL = `${BASE_BACKEND_URL}/api/v1/signed-url/post?status=published`;
    const signedUrl = getSignedUrl(baseURL, 60);
    const response = await fetch(signedUrl, { cache: "no-store" });
    const data = await response.json();

    const posts = Array.isArray(data?.data?.posts)
      ? data.data.posts.filter(Boolean)
      : Array.isArray(data?.data)
      ? data.data.filter(Boolean)
      : [];

    const filteredPosts = slug
      ? posts.filter((post: any) =>
          post?.categories?.some(
            (category: any) =>
              category?.slug?.toLowerCase() === slug ||
              category?.name?.toLowerCase() === slug
          )
        )
      : posts;

    return NextResponse.json({ data: { posts: filteredPosts } });
  } catch (err: any) {
    console.error("Error in /api/category/[slug] route:", err);
    return NextResponse.json(
      { error: err?.message || String(err) },
      { status: 500 }
    );
  }
}

