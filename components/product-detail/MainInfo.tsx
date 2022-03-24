import Rating from '@components/common/Rating';
import { formatMoney } from '@utils/index';
import { FunctionComponent, useState } from 'react';
import { DetailProductType, Variant } from 'types';
import ColorOptionBox from './ColorOptionBox';
import RatingBox from './RatingAndCommentBox';
import VariantBox from './VariantBox';

type Props = {
  product: DetailProductType;
};
const MainInfo: FunctionComponent<Props> = ({ product }) => {
  const { name, reviewCount, ratingValue, price, hasVariants, colorOptions } =
    product;
  const [selectedColorOption, setSelectedColorOption] = useState(
    colorOptions[0] || null
  );

  const variants: Variant[] = [
    {
      name: '128GB',
      price: '13500000',
      product: '5fcf32a586e9a40670068083',
      slug: 'iphone-8-plus-128gb'
    },
    {
      name: '64GB',
      price: '12000000',
      product: '5fd396f589ac500f06e9765e',
      slug: 'iphone-8-plus-64gb'
    },
    {
      name: '256GB',
      price: '19990000',
      product: '5fd3977b89ac500f06e97660',
      slug: 'iphone-8-plus-256gb'
    }
  ];
  return (
    <>
      <h1 className="text-xl font-semibold mb-3">{name}</h1>
      <Rating
        reviewCount={reviewCount}
        ratingValue={ratingValue}
        className="mb-1"
      />
      <div className="flex flex-col">
        <span className="text-2xl font-semibold text-red-600 mb-3">
          {formatMoney(price)}
        </span>
        <span className="text-xl font-medium text-gray-600 line-through mb-3">
          {formatMoney(price)}
        </span>
      </div>
      {hasVariants && <VariantBox option={variants} />}
      <>
        <div className="my-2">
          <span className="font-medium text-sm">Chọn màu để xem giá</span>
        </div>
        <ColorOptionBox
          colorOptions={colorOptions}
          selectedColorOption={selectedColorOption}
          changeColorOption={setSelectedColorOption}
        />
      </>
      <button
        className="w-full text-sm font-medium rounded-md text-white h-12 bg-gradient-to-r from-yellow-600 via-red-500 to-pink-500 uppercase "
        // onClick={() => dispatch(addToCart({ _id: product._id, name: product.name,slug:product.slug, quantity: product.quantity, option: product.selectedOption}))}
      >
        Thêm vào giỏ hàng
      </button>
    </>
  );
};

export default MainInfo;
