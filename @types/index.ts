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
  phone: string;
  name: string;
  provinceId: number;
  province: string;
  districtId: number;
  district: string;
  wardCode: string;
  ward: string;
  address: string;
  isDefault: boolean;
  addressType: 'home' | 'company';
};

export type AddressWithIdType = AddressType & {
  id: string;
};

export type Nullable<T> = { [K in keyof T]: T[K] | null };
export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type ProvinceType = {
  name: string;
  province_id: number;
};
export type DistrictType = {
  name: string;
  province_id: number;
  district_id: number;
};
export type WardType = {
  WardCode: string;
  DistrictID: number;
  WardName: string;
  [key: string]: unknown;
  // name: string;
  // ward_id: number;
  // district_id: number;
  // province_id: number;
};
