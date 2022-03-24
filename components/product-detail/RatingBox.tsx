import { StarIcon } from '@assets/icons';
import Progress from '@components/common/Progress';
import Rating from '@components/common/Rating';
import { FunctionComponent } from 'react';
type Props = any;
const RatingBox: FunctionComponent<Props> = (props) => {
  return (
    <div className="flex rounded-md w-full border">
      <div className="w-2/5 flex flex-col items-center justify-center p-[10px] border-r">
        <p className="mb-[5px] text-2xl font-bold">4.7/5</p>
        <div>
          <Rating classNameStar="w-6 h-6 text-yellow-500" ratingValue={4.7} />
        </div>
        <p>
          <strong>22</strong> đánh giá & nhận xét
        </p>
      </div>
      <div className="w-3/5 flex flex-col p-4">
        <div className="flex items-center mb-[5px]">
          <strong>5</strong>&nbsp;
          <StarIcon className="w-5 h-5 text-yellow-500 mr-[10px]" />
          <Progress total={22} progress={15} className="mr-3" />
          <p className="m-0 w-28 text-right text-sm">15 đánh giá</p>
        </div>
        <div className="flex items-center mb-[5px]">
          <strong>4</strong>&nbsp;
          <StarIcon className="w-5 h-5 text-yellow-500 mr-[10px]" />
          <Progress total={22} progress={7} className="mr-3" />
          <p className="m-0 w-28 text-right text-sm">7 đánh giá</p>
        </div>
        <div className="flex items-center mb-[5px]">
          <strong>3</strong>&nbsp;
          <StarIcon className="w-5 h-5 text-yellow-500 mr-[10px]" />
          <Progress total={22} progress={0} className="mr-3" />
          <p className="m-0 w-28 text-right text-sm">0 đánh giá</p>
        </div>
        <div className="flex items-center mb-[5px]">
          <strong>2</strong>&nbsp;
          <StarIcon className="w-5 h-5 text-yellow-500 mr-[10px]" />
          <Progress total={22} progress={0} className="mr-3" />
          <p className="m-0 w-28 text-right text-sm">0 đánh giá</p>
        </div>
        <div className="flex items-center mb-[5px] last:mb-0">
          <strong>1</strong>&nbsp;
          <StarIcon className="w-5 h-5 text-yellow-500 mr-[10px]" />
          <Progress total={22} progress={0} className="mr-3" />
          <p className="m-0 w-28 text-right text-sm">0 đánh giá</p>
        </div>
      </div>
    </div>
  );
};

export default RatingBox;
