export type ProductType = {
  id: string;
  name: string;
  lname: string;
  slug: string;
  thumbnail: string;
  price: number;
  reviewCount: number;
  ratingValue: number;
  isHot: boolean;
  discount: number;
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
  discount: number;
  variantsId: string;
  variants: VariantType;
  attrs: DeviceInfoType[];
  colorOptions: ColorOption[];
  comments: CommentType[];
  reviews: ReviewType[];
};
export type VariantType = {
  id: string;
  variants: Variant[];
};
export type ReviewType = any;

export type Variant = {
  name: string;
  price: number;
  slug: string;
};

export type ColorOption = {
  name: string;
  id: string;
  price: number;
  amount: number;
  images: string[];
};

export type CommentType = {
  id: string;
  productId: string;
  userId: string;
  author: {
    id: string;
    name: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
  level: number;
  replies: CommentType[];
  rootCommentId: string;
  replyToCommentId: string;
  replyToUser?: string;
};

// export type CommentReplyType = {
//   id: string;
//   productId: string;
//   userId: string;
//   author: {
//     id: string;
//     name: string;
//   };
//   content: string;
//   createdAt: string;
//   updatedAt: string;
//   level: number;

//   rootCommentId?: string;
// };

export type AddressType = {
  id: string;
  phone: string;
  name: string;
  districtId: number;
  district: string;
  provinceId: number;
  province: string;
  wardId: number;
  ward: string;
  address: string;
  isDefault: boolean;
  addressType: 'home' | 'company';
};
