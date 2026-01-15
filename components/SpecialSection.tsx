import { formatDate } from "@/lib/formatDate";
import { Article, ArticleCategory } from "@/types/article";
import Image from "next/image";
import Link from "next/link";

export default function SpecialSection({ data }: { data: Article[] }) {
  if (data.length === 0) {
    return null;
  }

  const specialPosts = data?.filter((post: Article) =>
    post.categories?.some(
      (cat: ArticleCategory) => cat?.slug?.toLowerCase() === "special"
    )
  );

  const defencePosts = data?.filter((post: Article) =>
    post.categories?.some(
      (cat: ArticleCategory) => cat?.slug?.toLowerCase() === "defence"
    )
  );

  const sportsPosts = data?.filter((post: Article) =>
    post.categories?.some(
      (cat: ArticleCategory) => cat?.slug?.toLowerCase() === "sports"
    )
  );

  return (
    <section className="mt-10">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: main list */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="inline-block bg-black text-white px-3 py-1 rounded">
                विशेष
              </div>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            <div className="space-y-4">
              {specialPosts?.map((item: Article) => (
                <article
                  key={item._id}
                  className="flex gap-4 items-start bg-white p-3 rounded shadow-sm"
                >
                  <div className="w-28 h-20 relative flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={item.featuredImage}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-2">
                      <Link
                        href={`/articles/${item?._id}`}
                        className="hover:text-blue-700"
                      >
                        {item?.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                      {item?.subTitle || item?.quote} ...
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      {formatDate(item?.publishDate)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right: sidebar widgets */}
          <aside className="lg:col-span-4 space-y-6">
            {defencePosts && defencePosts?.length > 0 && (
              <div className="bg-white p-4 rounded shadow">
                <h4 className="font-semibold mb-2">सुरक्षा</h4>
                <ul className="space-y-3">
                  {defencePosts?.map((post: Article, index: number) => {
                    return (
                      <li key={index}>
                        <Link
                          href={`/articles/${post?._id}`}
                          className="text-sm hover:text-blue-700"
                        >
                          {post?.title} ...
                        </Link>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatDate(post?.publishDate)}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {sportsPosts && sportsPosts?.length > 0 && (
              <div className="bg-white p-4 rounded shadow">
                <h4 className="font-semibold mb-2">खेलाधिक</h4>
                <ul className="space-y-3">
                  {sportsPosts?.map((post: Article, index: number) => {
                    return (
                      <li key={index}>
                        <Link
                          href={`/articles/${post?._id}`}
                          className="text-sm hover:text-blue-700"
                        >
                          {post?.title} ...
                        </Link>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatDate(post?.publishDate)}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
