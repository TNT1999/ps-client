import { ClockIcon } from '@assets/icons';
import UserAvatar from '@components/common/Avatar';
import Rating from '@components/common/Rating';
import dayjs from '@utils/dayjs';
import { isEmpty } from 'lodash';
import { FunctionComponent } from 'react';
type Props = {
  review: any;
};
const ReviewItem: FunctionComponent<Props> = ({ review }) => {
  return (
    <div className="ml-auto mb-4">
      <div className="flex justify-between mb-3">
        <div className="flex items-center justify-center">
          <UserAvatar name={review.reviewer.name} />
          <p className="m-0 text-md font-medium">{review.reviewer.name}</p>
        </div>
        <p className="flex items-center text-sm m-0 font-medium">
          <ClockIcon />
          &nbsp;{dayjs(review.createdAt).fromNow()}
        </p>
      </div>
      <div className="p-[10px] rounded-md w-full mb-4 ml-auto bg-[#f3f4f6]">
        <Rating ratingValue={3} />
        <p className="m-0 text-base text-gray-900">{review.content.content}</p>

        <div className="flex gap-x-2 mt-4">
          {!isEmpty(review.content.images) &&
            review.content.images.map((image: string, index: number) => {
              return (
                <div
                  key={index}
                  className="rounded h-24 w-24 border border-[#e0e0e0] bg-cover"
                  style={{ backgroundImage: `url(${image})` }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default ReviewItem;
