import { ClockIcon, CloseIcon } from '@assets/icons';
import UserAvatar from '@components/common/Avatar';
import Rating from '@components/common/Rating';
import dayjs from '@utils/dayjs';
import { isEmpty } from 'lodash';
import { FunctionComponent, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';

type Props = {
  review: any;
};

const FullScreenImage: FunctionComponent<{
  images: string[];
  onClose: () => void;
  index: number;
}> = ({ images, onClose, index }) => {
  const [activeThumb, setActiveThumb] = useState<any>(null);

  return (
    <div className="fixed h-full w-full p-5 top-0 left-0 flex flex-col bg-[#000000f2] z-50 animate-fadeIn">
      <div className="cursor-pointer absolute top-10 right-10">
        <CloseIcon onClick={onClose} className="w-10 h-10 text-gray-300" />
      </div>
      <Swiper
        loop={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{ swiper: activeThumb }}
        className="relative h-[calc(100%-30px)] w-[550px] overflow-hidden flex items-center justify-center select-none group flex-1 rounded-md"
        initialSlide={index}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center overflow-hidden rounded-md"
          >
            <img
              src={image}
              alt=""
              className="block h-[550px] w-[550px] object-contain rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        slidesPerView={'auto'}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        className="mb-5 thumbs-slider basis-24 w-[395px]"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="py-2 px-1 items-center overflow-hidden rounded-md select-none !w-1/5"
          >
            <img
              src={image}
              alt=""
              className="block h-20 w-full object-contain cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
const ReviewItem: FunctionComponent<Props> = ({ review }) => {
  const reviewData = review.content;
  const [visibleFullScreenImage, setVisibleFullScreenImage] = useState<
    number | undefined
  >(undefined);
  const handleFullScreenImage = (index: number) => {
    setVisibleFullScreenImage(index);
  };
  return (
    <div className="ml-auto border-b border-[#f2f2f2] mb-3 last:mb-0 last:border-0">
      <div className="flex justify-between mb-2 px-[10px]">
        <div className="flex items-center justify-center">
          <UserAvatar name={review.reviewer.name} />
          <p className="text-md font-medium ml-2">{review.reviewer.name}</p>
        </div>
        <p className="flex items-center text-sm font-medium">
          <ClockIcon />
          &nbsp;{dayjs(review.createdAt).fromNow()}
        </p>
      </div>
      <div className="p-[10px] rounded-md w-full mb-4 ml-auto">
        <Rating classNameStar="w-5 h-5" ratingValue={review.reviewValue} />
        <div className="text-13 font-normal text-[#242424] whitespace-pre-wrap py-3">
          {reviewData.content}
        </div>
        <div className="flex gap-x-2">
          {!isEmpty(reviewData.images) &&
            review.content.images.map((image: string, index: number) => {
              return (
                <div
                  onClick={() => handleFullScreenImage(index)}
                  key={index}
                  className="rounded-md h-24 w-24 border border-[#e0e0e0] bg-cover cursor-pointer"
                  style={{ backgroundImage: `url(${image})` }}
                />
              );
            })}
        </div>
        {visibleFullScreenImage !== undefined && (
          <FullScreenImage
            index={visibleFullScreenImage}
            images={reviewData.images}
            onClose={() => setVisibleFullScreenImage(undefined)}
          />
        )}
      </div>
    </div>
  );
};
export default ReviewItem;
