export interface StoryImage {
  url: string;
  name?: string;
  description?: string;
}
export interface Story {
  _id: string;
  title: string;
  description: string;
  publishedAt:string
  author: {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  } | string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'draft' | 'archived';
  permaLink?: string;
  slug?: string;
  image?: StoryImage[];
  posterImage?: string;
  logo?: string;
  backgroundAudio?: string;
  visibility?: 'public' | 'private';
  category?: string;
  tag?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    slug?: string;
    canonicalUrl?: string;
    robots?: string;
  };
}