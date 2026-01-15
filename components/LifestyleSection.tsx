import Image from "next/image";
import Link from "next/link";
import { getArticlesByCategory } from "../lib/articles";
import { Article } from "@/types/article";
import { formatDate } from "@/lib/formatDate";

export default function LifestyleSection({
  lifestylePosts,
}: {
  lifestylePosts: Article[];
}) {
  if (lifestylePosts.length === 0) {
    return null;
  }

  const items = getArticlesByCategory("lifestyle") || [];
  const display = lifestylePosts.length > 0 && lifestylePosts.slice(0, 5);

  return (
    <section className="mt-8">
      <div className="container">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold">लाइफ स्टाइल</h2>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {display &&
            display?.length > 0 &&
            display?.map((item: Article) => (
              <article
                key={item._id}
                className="bg-white rounded shadow-md overflow-hidden"
              >
                <div className="w-full h-40 relative">
                  {item.featuredImage ? (
                    <Image
                      src={item.featuredImage}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  ) : (
                    <div className="bg-gray-200 w-full h-full" />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm leading-snug mb-2 line-clamp-3">
                    <Link
                      href={`/articles/${item?._id}`}
                      className="text-gray-900 hover:text-blue-600"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <div className="text-xs text-gray-500">
                    {formatDate(item.publishDate)}
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
