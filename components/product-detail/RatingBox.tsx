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
        <p className="mb-[5px] text-2xl font-bold">{ratingValue}/5</p>
        <div>
          <Rating classNameStar="w-6 h-6" ratingValue={ratingValue} />
        </div>
        <p>
          <strong>{reviewCount}</strong> đánh giá & nhận xét
        </p>
      </div>
      <div className="w-3/5 flex flex-col p-4">
        {ratingValueByStar.map((rating, index) => (
          <div key={index} className="flex items-center mb-[5px]">
            <strong>{rating.star}</strong>&nbsp;
            <StarIcon className="w-5 h-5 text-yellow-500 mr-[10px]" />
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

        {/* <div className="flex items-center mb-3">
          <svg
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            className="w-5 h-5 text-gray-300 dark:text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
            4.95 out of 5
          </p>
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          1,745 global ratings
        </p>
        <div className="flex items-center mt-4">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
            5 star
          </span>
          <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
            <div
              className="h-5 bg-yellow-400 rounded"
              style={{ width: '70%' }}
            ></div>
          </div>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
            70%
          </span>
        </div>
        <div className="flex items-center mt-4">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
            4 star
          </span>
          <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
            <div
              className="h-5 bg-yellow-400 rounded"
              style={{ width: '17%' }}
            ></div>
          </div>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
            17%
          </span>
        </div>
        <div className="flex items-center mt-4">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
            3 star
          </span>
          <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
            <div
              className="h-5 bg-yellow-400 rounded"
              style={{ width: '8%' }}
            ></div>
          </div>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
            8%
          </span>
        </div>
        <div className="flex items-center mt-4">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
            2 star
          </span>
          <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
            <div
              className="h-5 bg-yellow-400 rounded"
              style={{ width: '4%' }}
            ></div>
          </div>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
            4%
          </span>
        </div>
        <div className="flex items-center mt-4">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
            1 star
          </span>
          <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
            <div
              className="h-5 bg-yellow-400 rounded"
              style={{ width: '1%' }}
            ></div>
          </div>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
            1%
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default RatingBox;
