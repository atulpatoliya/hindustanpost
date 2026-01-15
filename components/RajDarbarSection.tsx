import Image from "next/image";
import Link from "next/link";
import { Article, ArticleCategory } from "@/types/article";
import { formatDate } from "@/lib/formatDate";

type Props = {
  posts?: Article[];
};

export default function RajDarbarSection({ posts = [] }: Props) {
  const specialPosts = posts?.filter((post: Article) =>
    post.categories?.some((cat: ArticleCategory) =>
      ["raj-darbar", "newraaj-drbaar"].includes(cat?.slug?.toLowerCase())
    )
  );
  const items = specialPosts?.slice(0, 5);

  if (!specialPosts?.length) {
    return (
      <section className="mt-8">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold">राज दरबार</h2>
            <div className="flex-1 border-t border-gray-200" />
          </div>
          <div className="bg-gray-50 border border-dashed border-gray-200 rounded p-6 text-center text-gray-500">
            ताज़ा खबरें उपलब्ध नहीं हैं।
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="container">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold">राज दरबार</h2>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {items &&
            items?.length > 0 &&
            items?.map((item) => {
              const date = formatDate(item?.publishDate);

              return (
                <article
                  key={item?._id}
                  className="bg-white rounded shadow-md overflow-hidden"
                >
                  <div className="w-full h-40 relative">
                    <Image
                      src={item?.featuredImage || "/fallback.png"}
                      alt={item?.title || "Article"}
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm leading-snug mb-2 line-clamp-3">
                      <Link
                        href={`/articles/${item?._id}`}
                        className="text-gray-900 hover:text-blue-600"
                      >
                        {item?.title || "अनाम लेख"}
                      </Link>
                    </h3>
                    <div className="text-xs text-gray-500">{date}</div>
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </section>
  );
}
