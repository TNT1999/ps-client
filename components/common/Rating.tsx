import { StarIcon } from '@assets/icons';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

type Props = {
  ratingValue: number;
  reviewCount?: number;
  className?: string;
  classNameStar?: string;
};
const Rating: FunctionComponent<Props> = ({
  ratingValue,
  reviewCount,
  className,
  classNameStar
}) => {
  return (
    <div className={classNames('flex items-center', className)}>
      <div className="flex">
        {[...Array(5)].map((star, i) => {
          const w = i + 1;
          return (
            <StarIcon
              key={i}
              className={classNames(
                classNameStar,
                `${
                  Math.round(ratingValue) >= w
                    ? 'text-yellow-400'
                    : 'text-gray-400'
                }`
              )}
            />
          );
        })}
      </div>
      {reviewCount && (
        <a className="text-11 ml-1 inline-block whitespace-nowrap">
          {reviewCount} đánh giá
        </a>
      )}
    </div>
  );
};
export default Rating;
