import { StarIcon } from '@assets/icons';
import React, { FunctionComponent } from 'react';

type IProps = {
  ratingValue: number;
  reviewCount: number;
};
const Rating: FunctionComponent<IProps> = ({ ratingValue, reviewCount }) => {
  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(5)].map((star, i) => {
          const w = i + 1;
          return (
            <StarIcon
              key={i}
              className={`${
                Math.round(ratingValue) >= w
                  ? 'text-yellow-400'
                  : 'text-gray-400'
              }`}
            />
          );
        })}
      </div>
      <div className="text-xs ml-1 inline-block whitespace-nowrap">
        {reviewCount} đánh giá
      </div>
    </div>
  );
};
export default Rating;
