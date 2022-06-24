import { StarIcon } from '@assets/icons';
import Progress from '@components/common/Progress';
import Rating from '@components/common/Rating';
import { FunctionComponent } from 'react';
type Props = {
  ratingValueByStar: any[];
  reviewCount: number;
  ratingValue: number;
};
const RatingBox: FunctionComponent<Props> = ({
  ratingValueByStar,
  reviewCount,
  ratingValue
}) => {
  return (
    <div className="flex rounded-md w-full border">
      <div className="w-2/5 flex flex-col items-center justify-center p-[10px] border-r">
        <p className="mb-2 text-2xl font-bold">{Math.round(ratingValue)} / 5</p>
        <div>
          <Rating
            classNameStar="w-7 h-7"
            ratingValue={Math.round(ratingValue)}
          />
        </div>
        <p className="mt-1">
          <strong>{reviewCount}</strong> đánh giá & nhận xét
        </p>
      </div>
      <div className="w-3/5 flex flex-col p-4">
        {ratingValueByStar.map((rating, index) => (
          <div key={index} className="flex items-center mb-[5px]">
            <strong>{rating.star}</strong>&nbsp;
            <StarIcon className="w-6 h-6 text-yellow-500 mr-[10px]" />
            <Progress
              total={reviewCount}
              progress={rating.count}
              className="mr-3"
            />
            <p className="m-0 w-28 text-right text-sm">
              {rating.count} đánh giá
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingBox;
