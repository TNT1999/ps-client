import { add2Cart } from '@app/slice/cartSlice';
import { useAppDispatch } from '@app/store';
import { Add2CartIcon } from '@assets/icons';
import NumberInput from '@components/common/NumberInput';
import NumberQuantity from '@components/common/NumberQuantity';
import Rating from '@components/common/Rating';
import { formatMoney } from '@utils/index';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DetailProductType, Variant } from 'types';
import ColorOptionBox from './ColorOptionBox';
import VariantBox from './VariantBox';

type Props = {
  product: DetailProductType;
  carouselRef: any;
  images: string[];
};
const MainInfo: FunctionComponent<Props> = ({
  product,
  carouselRef,
  images
}) => {
  const {
    id,
    name,
    slug,
    reviewCount,
    ratingValue,
    price,
    hasVariants,
    colorOptions,
    variants,
    discount
  } = product;

  const dispatch = useAppDispatch();
  const [finalSelectProduct, setFinalSelectProduct] = useState({
    id,
    name,
    slug,
    quantity: 1,
    selectedOption: colorOptions[0]
  });

  const handleAdd2Cart = () => {
    dispatch(
      add2Cart({
        id: finalSelectProduct.id,
        name: finalSelectProduct.name,
        slug: finalSelectProduct.slug,
        quantity: finalSelectProduct.quantity,
        option: finalSelectProduct.selectedOption,
        discount
      })
    );
    toast.success('Thêm vào giỏ hàng thành công', {
      autoClose: 1000
    });
  };
  const handleColorOption = useCallback(
    (item) => {
      setFinalSelectProduct((product) => {
        return {
          ...product,
          selectedOption: item
        };
      });

      const index = images.findIndex((color) => color === item.images[0]);
      carouselRef.slideTo(index + 1);
    },
    [carouselRef, images]
  );

  const handleQuantity = useCallback((value) => {
    console.log('change value quantity', value);
    setFinalSelectProduct((product) => {
      return {
        ...product,
        quantity: value
      };
    });
  }, []);

  useEffect(() => {
    setFinalSelectProduct({
      id: product.id,
      name: product.name,
      slug: product.slug,
      quantity: 1,
      selectedOption: product.colorOptions[0]
    });
  }, [product]);

  return (
    <>
      <h1 className="mb-3 text-2xl font-normal">{name}</h1>
      <Rating
        reviewCount={reviewCount}
        ratingValue={ratingValue}
        className="mb-1"
      />
      <div className="flex flex-col">
        {discount ? (
          <>
            <span className="text-3xl font-medium text-[#ff424e] mb-3">
              {formatMoney(
                parseInt(finalSelectProduct.selectedOption.price) *
                  (100 - discount) *
                  0.01
              )}
              <span className="py-0 px-1 leading-3.5 ml-2 font-normal text-sm border-[#ff424e] border-px bg-[#fff0f1]">{`-${discount}%`}</span>
            </span>
          </>
        ) : (
          <span>{formatMoney(finalSelectProduct.selectedOption.price)}</span>
        )}
        <span className="text-xl font-medium text-gray-600 line-through mb-3">
          {formatMoney(finalSelectProduct.selectedOption.price)}
        </span>
      </div>
      {hasVariants && <VariantBox option={variants.variants} />}
      <>
        <div className="my-2">
          <span className="font-medium text-sm">Chọn màu để xem giá</span>
        </div>
        <ColorOptionBox
          discount={discount}
          colorOptions={colorOptions}
          selectedColorOption={finalSelectProduct.selectedOption}
          changeColorOption={handleColorOption}
        />
      </>
      <div className="flex items-center h-8 my-4">
        <span className="font-medium text-base mr-3">Số lượng: </span>
        {/* <NumberInput
          inputClassName="text-lg pl-4"
          initValue={finalSelectProduct.quantity}
          onChange={(e) => handleQuantity(e)}
          containerClassName="w-auto"
        /> */}
        <NumberQuantity
          value={finalSelectProduct.quantity.toString()}
          onChange={(e) => handleQuantity(e)}
          maxValue={finalSelectProduct.selectedOption.amount}
        />
      </div>
      <button
        className="w-full text-sm font-medium rounded-md text-white h-12 bg-gradient-to-r from-yellow-600 via-red-500 to-pink-500 uppercase flex justify-center items-center shadow-md select-none"
        onClick={handleAdd2Cart}
      >
        <Add2CartIcon className="mr-3" />
        Thêm vào giỏ hàng
      </button>
    </>
  );
};

export default MainInfo;
