import React from 'react';
import Link from 'next/link';
import Rating from '../common/rating';
import { formatMoney } from '../../utils';
type ProductProps = {
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  reviewCount: number;
  ratingValue: number;
};
interface IProps {
  product: ProductProps;
}

const ProductCard: React.FC<IProps> = ({ product }) => {
  const { name, slug, thumbnail, price, reviewCount, ratingValue } = product;
  return (
    <div className="flex-1/5 pr-2 pb-2 min-h-72 rounded hover:shadow-xl duration-100">
      <Link href={`/dien-thoai/${slug}`}>
        <a className="block h-full">
          <div className="px-1 py-4 pb-2 h-full">
            <div className="card-thumbnail">
              <img src={thumbnail} alt={name} className="max-h-48" />
            </div>
            <div className="py-2 px-1">
              <h3 className="text-sm font-medium py-2 text-gray-800">{name}</h3>
              <div className="flex flex-col">
                <span className="font-medium text-red-600 text-base">
                  {formatMoney(price)}
                </span>
                <span className="text-sm font-medium text-gray-600 line-through">
                  {formatMoney(price)}
                </span>
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