export interface Data_Interface {
  step:string,
  _type: string | "post" | "post-ia";
  categoria: Categoria[];
  _id?:string 
  content: any
  coverImage: CoverImage;
  date: string;
  excerpt: string;
  publicado?: boolean;
  slug: Slug;
  title: string;
  createdAt:string
  updatedAt:string
}

interface Slug {
  _type: string | "slug"
  current: string;
  _id:string
}

interface CoverImage {
  _type: string | "image";
  alt: string;
  src?: string;
  asset?:{
    _ref:string,
    _type:string
  }
}


interface Categoria {
  _key:string
  _ref:string
  _type:string
}
interface content {
  _key: string;
  children: Child[];
  markDefs: any[];
  tipo: string;
  _type: string;
  style: string;
}

interface Child {
  _type: string;
  marks: any[];
  text: string;
  _key: string;
}