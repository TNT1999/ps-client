export type ProductType = {
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
export type DeviceInfoType = {
  name: string;
  value: string;
};
export type DetailProductType = {
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
  attrs: DeviceInfoType[];
  colorOptions: ColorOption[];
};

export type Variant = {
  name: string;
  price: string;
  product: string;
  slug: string;
};

export type ColorOption = {
  name: string;
  id: string;
  price: string;
  amount: string;
  images: string[];
};
