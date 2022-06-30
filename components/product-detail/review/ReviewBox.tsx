import { FunctionComponent, useEffect, useState } from 'react';
import { ReviewType } from '@types';
import RatingBox from '../RatingBox';
import ReviewItem from './ReviewItem';
import Pagination from '@components/common/Pagination';
import isEmpty from 'lodash/isEmpty';
import { motion, useAnimation } from 'framer-motion';
import { useUpdateEffect } from 'react-use';
import axiosClient from '@utils/api';
import classNames from 'classnames';
type Props = {
  pid: string;
  listReview: ReviewType[];
  ratingValue: number;
  ratingByStar: any[];
  reviewCount: number;
};
const ReviewBox: FunctionComponent<Props> = ({
  pid,
  listReview = [],
  ratingValue,
  ratingByStar,
  reviewCount
}) => {
  const [reviews, setReviews] = useState<any[]>(listReview);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingReview, setLoadingReview] = useState(false);
  const reviewPerPage = 5;
  const totalPage = Math.ceil(reviewCount / reviewPerPage);
  const handleChange = (page: number) => {
    if (page === 0 || page > totalPage) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    setReviews(listReview);
  }, [pid]);

  useUpdateEffect(() => {
    const getReviews = async (pid: string, currentPage: number) => {
      try {
        setLoadingReview(true);
        const result: any = await axiosClient.get(
          `/reviews?pid=${pid}&page=${currentPage}`
        );
        setReviews(result);
        setLoadingReview(false);
      } catch (e) {
        console.log(e);
      }
    };
    getReviews(pid, currentPage);
  }, [currentPage]);

  const ratingValueByStar = [
    {
      star: 5,
      count: ratingByStar.find(({ star }) => star === 5)?.count ?? 0
    },
    {
      star: 4,
      count: ratingByStar.find(({ star }) => star === 4)?.count ?? 0
    },
    {
      star: 3,
      count: ratingByStar.find(({ star }) => star === 3)?.count ?? 0
    },
    {
      star: 2,
      count: ratingByStar.find(({ star }) => star === 2)?.count ?? 0
    },
    {
      star: 1,
      count: ratingByStar.find(({ star }) => star === 1)?.count ?? 0
    }
  ];
  return (
    <div className="rounded-md p-3">
      <p className="text-xl font-normal m-0 p-[10px]">Đánh giá & nhận xét</p>
      <RatingBox
        ratingValueByStar={ratingValueByStar}
        reviewCount={reviewCount}
        ratingValue={ratingValue}
      />
      {!isEmpty(reviews) && (
        <div
          className={classNames({
            'opacity-60': loadingReview,
            'opacity-100': !loadingReview
          })}
        >
          <div className="mt-4">
            {reviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
          <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewBox;
