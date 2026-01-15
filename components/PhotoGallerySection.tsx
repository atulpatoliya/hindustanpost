import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";
import { formatDate } from "@/lib/formatDate";

type Props = {
  posts?: Article[];
};

export default function PhotoGallerySection({ posts = [] }: Props) {
  const items = posts.slice(0, 16);
  const [featured, ...rest] = items;
  const restItems = rest.slice(0, 3);
  const hasItems = Boolean(featured);

  if (!hasItems) {
    return (
      <section className="mt-10 py-8">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <div className="inline-block bg-black text-white px-4 py-1 rounded">
              फोटो गैलरी
            </div>
            <div className="flex-1 border-t border-black/40" />
          </div>
          <div className="bg-gray-50 border border-dashed border-gray-200 rounded p-6 text-center text-gray-500">
            फोटो गैलरी के लिए सामग्री उपलब्ध नहीं है।
          </div>
        </div>
      </section>
    );
  }

  const featuredDate = formatDate(featured?.publishDate);

  return (
    <section className="mt-10 py-8">
      <div className="container">
        <div className="flex items-center gap-4 mb-6">
          <div className="inline-block bg-black text-white px-4 py-1 rounded">
            फोटो गैलरी
          </div>
          <div className="flex-1 border-t border-black/40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <div className="relative rounded overflow-hidden shadow-lg">
              <div className="w-full h-[420px] relative">
                {featured?.featuredImage && (
                  <Image
                    src={featured?.featuredImage || "/fallback.png"}
                    alt={featured?.title || "Gallery item"}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                )}
              </div>
              <Link
                href={`/articles/${featured?._id}`}
                className="absolute left-0 right-0 bottom-0 bg-black/60 text-white p-6"
              >
                {featured?.title && (
                  <h3 className="text-2xl font-bold line-clamp-2">
                    {featured?.title || "अनाम लेख"}
                  </h3>
                )}
                <div className="text-sm mt-2">{featuredDate}</div>
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="space-y-4">
              {restItems &&
                restItems.map((item) => {
                  const date = formatDate(item?.publishDate);
                  return (
                    <div
                      key={item?._id}
                      className="flex gap-3 items-start bg-white/80 p-3 rounded"
                    >
                      <div className="w-20 h-14 relative flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src={item?.featuredImage || "/fallback.png"}
                          alt={item?.title || "Gallery item"}
                          fill
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold line-clamp-2">
                          <Link
                            href={`/articles/${item?._id}`}
                            className="text-black hover:text-blue-700"
                          >
                            {item?.title || "अनाम लेख"}
                          </Link>
                        </h4>
                        <div className="text-xs text-gray-800 mt-1">{date}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
