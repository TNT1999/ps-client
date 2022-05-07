import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import React, { FunctionComponent, SetStateAction, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import { ChevronLeftIcon, ChevronRightIcon } from '@assets/icons';

type Props = {
  swiperWrapperClass?: string;
  swiperSliderClass?: string;
  images: string[];
  handleRef: (carousel: any) => void;
};

const ProductCarousel: FunctionComponent<Props> = ({ images, handleRef }) => {
  const [activeThumb, setActiveThumb] = useState<any>(null);
  const [swiper, setSwiper] = useState<any>(null);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  return (
    <>
      <Swiper
        onSwiper={(instance: SetStateAction<any>) => {
          setSwiper(instance);
          handleRef(instance);
        }}
        // onSwiper={setSwiper}
        loop={true}
        spaceBetween={10}
        navigation={{
          prevEl: navigationPrevRef.current
            ? navigationPrevRef.current
            : undefined,
          nextEl: navigationNextRef.current
            ? navigationNextRef.current
            : undefined
        }}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{ swiper: activeThumb }}
        className="relative h-96 w-96 overflow-hidden mb-5 flex items-center justify-center select-none group"
      >
        {images.map((thumbnail, index) => (
          <SwiperSlide
            key={index}
            className="p-5 flex items-center overflow-hidden bg-white rounded-md"
          >
            <img src={thumbnail} alt="" className="block w-full object-cover" />
          </SwiperSlide>
        ))}
        <div
          className="absolute left-1 right-auto top-1/2 cursor-pointer text-[#007aff] z-10 group-hover:block hidden duration-200"
          ref={navigationPrevRef}
          onClick={() => swiper && swiper.slidePrev()}
        >
          <ChevronLeftIcon className="h-8" />
        </div>
        <div
          className="absolute right-1 left-auto top-1/2 cursor-pointer text-[#007aff] z-10 group-hover:block hidden duration-200"
          ref={navigationNextRef}
          onClick={() => swiper.slideNext()}
        >
          <ChevronRightIcon className="h-8" />
        </div>
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={'auto'}
        modules={[Navigation, Thumbs]}
        className="mb-3 h-16 thumbs-slider"
      >
        {images.map((thumbnail, index) => (
          <SwiperSlide
            key={index}
            className="hidden md:flex py-2 px-1 items-center overflow-hidden bg-white rounded-md !w-14 select-none"
          >
            <img src={thumbnail} alt="" className="block w-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductCarousel;
