export type Product = {
  id: string;
  name: string;
  lname: string;
  slug: string;
  thumbnail: string;
  price: string;
  reviewCount: number;
  ratingValue: number;
  isHot: boolean;
  isMainProduct: boolean;
};

export type DetailProduct = {
  id: string;
  cat: string;
  brand: string;
  slug: string;
  name: string;
  lname: string;
  thumbnail: string;
  price: number;
  ratingValue: number;
  reviewCount: number;
  hasVariants: boolean;
  mainProduct: boolean;
  isHot: boolean;
  createdAt: Date;
  updatedAt: Date;
  linkVariants: string;
};
