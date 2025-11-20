export interface ArticleCategory {
  _id: string
  name: string
  status: string
  slug: string
  parentId: string | null
}

export interface ArticleTag {
  _id: string
  name: string
  status: string
}

export interface ArticlePerson {
  _id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  roleId: string
}

export interface ArticleSEO {
  metaTitle: string
  metaDescription: string
  metaKeywords: string[]
  slug: string
  robots: string
  ogType: string
  twitterCard: string
  priority: number
  changeFrequency: string
  _id: string
  createdAt: string
  updatedAt: string
}

export type HtmlContent = string | { __html: string }

export interface Article {
  _id: string
  title: string
  subTitle: string
  postContent: HtmlContent
  gallery: string[]
  video: string[]
  audio: string[]
  link: string[]
  quote: string
  featuredImage: string
  categories: ArticleCategory[]
  tags: ArticleTag[]
  author: ArticlePerson
  podcasts: string
  status: string
  postType: string
  seo: ArticleSEO
  visitorCounter: number
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
  approvedBy: ArticlePerson | null
  approvedDate: string | null
  rejectedBy: ArticlePerson | null
  rejectedDate: string | null
  rejectedReason: string | null
  updatedBy: ArticlePerson | null
  publishDate: string | null
}


