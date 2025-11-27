import Link from "next/link";
import Image from "next/image";
import getInternalBaseUrl from "@/lib/getInternalBaseUrl";
import { ArticleCategory } from "@/types/article";

export default async function Header() {
  let categories: ArticleCategory[] = [];
  try {
    const baseUrl = await getInternalBaseUrl();
    const response = await fetch(`${baseUrl}/api/category`, {
      next: { revalidate: 300 },
    });
    if (response.ok) {
      const { data } = await response.json();
      categories = Array.isArray(data) ? data.filter(Boolean) : [];
    } else if (process.env.NODE_ENV !== "production") {
      console.error("/api/category responded with", response.status);
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Failed to fetch categories:", err);
    }
  }

  // formatted date (server-side)
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const filteredCategories = categories?.filter(
    (category) => category && category.slug && !["6918761f9f2cc598904359c3", "6927042971f97cfca6ee1f57"].includes(category._id)
  );

  return (
    <header className=" bg-white">
      {/* Main header: logo centered with date below */}
      <div className="container py-4">
        <div className="flex items-start justify-between">
          {/* left-side: weather (visible on md+) */}
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-700 pt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden
            >
              <path d="M2 7c2-2 6-2 8 0s6 2 8 0" strokeLinecap="round" />
              <path d="M2 11c2-2 6-2 8 0s6 2 8 0" strokeLinecap="round" />
              <path d="M2 15c2-2 6-2 8 0s6 2 8 0" strokeLinecap="round" />
            </svg>
            <span className="font-medium">31 °C</span>
            <span className="text-gray-500">Mumbai</span>
          </div>

          {/* Center: Logo with date below */}
          <div className="flex-1 flex flex-col items-center">
            <Link href="/" className="inline-flex items-center relative">
              <Image
                src="/Hindusthanpost-logo-300x57.png"
                alt="Hindustanpost"
                width={300}
                height={57}
                priority
              />
            </Link>
            <div className="mt-2 text-sm text-gray-600 text-center">
              {dateStr}
            </div>
          </div>

          {/* Right: Social icons stacked vertically with Marathi button below */}
          <div className="hidden md:flex flex-col items-end gap-3 pt-1">
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="td-social-btn">
                <i className="td-icon-font td-icon-facebook" />
              </a>
              <a href="#" aria-label="Instagram" className="td-social-btn">
                <i className="td-icon-font td-icon-instagram" />
              </a>
              <a href="#" aria-label="Twitter" className="td-social-btn">
                <i className="td-icon-font td-icon-twitter" />
              </a>
              <a href="#" aria-label="YouTube" className="td-social-btn">
                <i className="td-icon-font td-icon-youtube" />
              </a>
            </div>
            <button className="px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium">
              मराठी
            </button>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <div className="border-t container border-black border-b">
        <div className="">
          <nav className="grid gap-4 grid-flow-col overflow-x-auto py-3 text-base text-black scrollbar">
            {filteredCategories.map((category, index) => {
              // const href =
              //   slug.toLowerCase() === "web-stories"
              //     ? "/web-stories"
              //     : `/category/${slug}`;

              return (
                <Link
                  key={category?._id}
                  href={`/category/${category?.slug}`}
                  className={`capitalize ${
                    index !== 0 ? "px-3" : "px-0"
                  } py-1 hover:text-black whitespace-nowrap font-bold`}
                >
                  {category?.name}
                </Link>
              );
            })}
            {!categories.length && (
              <Link
                href="#"
                className="capitalize px-3 py-1 hover:text-black whitespace-nowrap font-bold text-gray-500"
              >
                श्रेणियाँ लोड हो रही हैं...
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
