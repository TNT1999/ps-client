import { FunctionComponent } from 'react';
import { ReviewType } from 'types';
import RatingBox from '../RatingBox';
import ReviewItem from './ReviewItem';
type Props = {
  reviews: ReviewType[];
  ratingValue: number;
};
const ReviewBox: FunctionComponent<Props> = ({ reviews = [], ratingValue }) => {
  const ratingValueByStar = [
    {
      star: 5,
      count: reviews.filter((review) => review.reviewValue === 5).length
    },
    {
      star: 4,
      count: reviews.filter((review) => review.reviewValue === 4).length
    },
    {
      star: 3,
      count: reviews.filter((review) => review.reviewValue === 3).length
    },
    {
      star: 2,
      count: reviews.filter((review) => review.reviewValue === 2).length
    },
    {
      star: 1,
      count: reviews.filter((review) => review.reviewValue === 1).length
    },
    {
      star: 0,
      count: reviews.filter((review) => review.reviewValue === 0).length
    }
  ];
  return (
    <div className="rounded-md mb-4 p-3">
      <p className="text-xl font-normal m-0 p-[10px]">Đánh giá & nhận xét</p>
      <RatingBox
        ratingValueByStar={ratingValueByStar}
        reviewCount={reviews.length}
        ratingValue={ratingValue}
      />
      {reviews && (
        <div className="mt-3">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewBox;
