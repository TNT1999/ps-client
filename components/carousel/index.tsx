import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import React, { FunctionComponent, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';

type Props = {
  thumbnails: string[];
  swiperWrapperClass?: string;
  swiperSliderClass?: string;
};

const ProductCarousel: FunctionComponent<Props> = ({ thumbnails }) => {
  const [activeThumb, setActiveThumb] = useState(null);
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        grabCursor={true}
        thumbs={{ swiper: activeThumb }}
        className="relative h-96 w-96 overflow-hidden mb-5 flex items-center justify-center"
      >
        {thumbnails.map((thumbnail, index) => (
          <SwiperSlide
            key={index}
            className="p-5 flex items-center border overflow-hidden bg-white rounded-md border-gray-300"
          >
            <img
              src={thumbnail}
              alt=""
              className="block w-full  object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        // onSwiper={setActiveThumb}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={'auto'}
        modules={[Navigation, Thumbs]}
        className="mb-3 h-16"
      >
        {thumbnails.map((thumbnail, index) => (
          <SwiperSlide
            key={index}
            className="hidden md:flex py-2 px-1 items-center border overflow-hidden bg-white rounded-md !w-14 border-gray-300"
          >
            <img src={thumbnail} alt="" className="block w-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductCarousel;
