import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import Rating from '@components/common/Rating';
import { formatMoney } from '@utils/index';
import { ProductType } from 'types';

type Props = {
  product: ProductType;
};

const ProductCard: FunctionComponent<Props> = ({ product }) => {
  const { name, slug, thumbnail, price, reviewCount, ratingValue, discount } =
    product;
  return (
    <div className="flex-1/5 pr-2 pb-2 min-h-72 rounded-md hover:shadow-lg duration-100">
      <Link href={`/dien-thoai/${slug}`}>
        <a className="block h-full">
          <div className="px-1 py-4 pb-2 h-full">
            <div className="flex items-center justify-center">
              <img src={thumbnail} alt={name} className="max-h-48" />
            </div>
            <div className="py-2 px-2">
              <h3 className="text-sm font-medium py-2 text-gray-800">{name}</h3>
              <div className="flex flex-col">
                <div className="font-medium text-red-600 text-base">
                  {discount ? (
                    <span>{formatMoney(price * (100 - discount) * 0.01)}</span>
                  ) : (
                    <span>{formatMoney(price)}</span>
                  )}
                  {discount && (
                    <span className="py-0 px-[2px] leading-3.5 ml-2 font-normal text-xs border-[#ff424e] border-px bg-[#fff0f1]">{`-${discount}%`}</span>
                  )}
                </div>
                {discount && (
                  <div className="text-sm font-medium text-gray-600 line-through">
                    {formatMoney(price)}
                  </div>
                )}
                <Rating ratingValue={ratingValue} reviewCount={reviewCount} />
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
export default ProductCard;
