'use client';
export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import nextDynamic from 'next/dynamic';
import { useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { WEB_STORIES_LIST } from '../../data/webstories';

const STORIES = WEB_STORIES_LIST;

const LATEST_NEWS = [
  { title: 'Harmanpreet Kaur की टीम ने जीता मैच', date: 'November 3, 2025' },
  { title: 'PM Modi का अभियान शुरू', date: 'November 3, 2025' },
  { title: 'Keshav Prasad Maurya का बयान', date: 'November 3, 2025' },
  { title: 'देश की नई उपलब्धि', date: 'November 2, 2025' },
  { title: 'खेल की दुनिया में बड़ी खबर', date: 'November 2, 2025' },
];

type WebStory = {
  slug: string;
  title: string;
  image: string;
  publisher?: string;
  date?: string;
};

interface WebStoryCardProps {
  story: WebStory;
  onOpen: (slug: string) => void;
}

function WebStoryCard({ story, onOpen }: WebStoryCardProps) {
  return (
    <article
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onOpen(story.slug)}
    >
      <div className="relative w-full h-48">
        <Image
          src={story.image}
          alt={story.title}
          fill
          style={{ objectFit: 'cover' }}
          className="hover:scale-105 transition-transform duration-300"
          unoptimized
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 leading-tight">
          <button
            onClick={() => onOpen(story.slug)}
            className="text-left text-gray-900 hover:text-blue-600 w-full"
          >
            {story.title}
          </button>
        </h3>
        <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
          <div>
            <div className="font-medium">
              {story.publisher || 'Hindusthan Post Bureau'}
            </div>
            <div className="text-gray-400">{story.date}</div>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>0</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function LatestNewsItem({ title, date }: { title: string; date: string }) {
  return (
    <div className="border-b border-gray-200 pb-3 mb-3 last:border-0 last:pb-0 last:mb-0">
      <Link
        href="#"
        className="text-sm text-gray-700 hover:text-blue-600 leading-snug"
      >
        {title}
      </Link>
      <div className="text-xs text-gray-400 mt-1">{date}</div>
    </div>
  );
}
const StoryOverlay = nextDynamic(() => import('./[slug]/page'), { ssr: false });

function WebStoriesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSlug = useMemo(() => searchParams.get('story'), [searchParams]);

  const openStory = (slug: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('story', slug);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const closeStory = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete('story');
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : '', { scroll: false });
  };

  return (
    <section className="mt-6">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {STORIES.map((story) => (
                <WebStoryCard key={story.slug} story={story} onOpen={openStory} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-between border-t pt-6">
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                  disabled
                >
                  ←
                </button>
                <button className="px-3 py-1 border rounded text-sm bg-black text-white hover:bg-gray-800">
                  1
                </button>
                <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                  3
                </button>
                <span className="px-2 text-gray-500">...</span>
                <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                  53
                </button>
                <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                  →
                </button>
              </div>
              <div className="text-sm text-gray-600">Page 1 of 53</div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Latest News */}
            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="bg-black text-white px-4 py-2 font-bold text-sm">
                Latest News
              </div>
              <div className="p-4">
                {LATEST_NEWS.map((item, idx) => (
                  <LatestNewsItem key={idx} title={item.title} date={item.date} />
                ))}
              </div>
              <div className="px-4 pb-4">
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded font-semibold hover:bg-green-700 transition-colors">
                  Join Our WhatsApp Community
                </button>
              </div>
            </div>

            {/* Popular */}
            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="bg-black text-white px-4 py-2 font-bold text-sm">
                Popular
              </div>
              <div className="p-4">
                {LATEST_NEWS.map((item, idx) => (
                  <LatestNewsItem key={idx} title={item.title} date={item.date} />
                ))}
              </div>
              <div className="px-4 pb-4 border-t pt-4">
                <div className="text-sm text-gray-500">
                  Tweets by HindusthanPostH
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
        {/* WhatsApp */}
        <a
          href="#"
          className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors shadow-lg"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-.923-.883-.391-1.48-.652-1.653-.85-.173-.198-.018-.306.13-.404.149-.099.297-.198.446-.297.149-.099.198-.148.297-.347.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
          </svg>
        </a>
      </div>

      {/* Story Modal */}
      {activeSlug && (
        <div className="fixed inset-0 z-[70]">
          <StoryOverlay params={{ slug: activeSlug }} />
          <button aria-label="Close" className="hidden" onClick={closeStory} />
        </div>
      )}
    </section>
  );
}

export default function WebStoriesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading Web Stories...</div>}>
      <WebStoriesContent />
    </Suspense>
  );
}
