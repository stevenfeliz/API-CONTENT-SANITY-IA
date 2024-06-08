export interface Post_Interface {
  _createdAt: string;
  _rev: string;
  _id?:string
  id:string
  _type: string;
  categoria: Categoria[];
  content: []
  coverImage: CoverImage;
  date: string;
  excerpt: string;
  publicado?: boolean;
  slug: Slug;
  title: string;
  _updatedAt: string;
}

interface Slug {
  _type: string;
  current: string;
}

interface CoverImage {
  _type: string;
  alt: string;
  asset: Asset;
}

interface Asset {
  _ref: string;
  _type: string;
}


interface Categoria {
  _key: string;
  _ref: string;
  _type: string;
}