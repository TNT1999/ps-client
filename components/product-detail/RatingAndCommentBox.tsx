import { FunctionComponent } from 'react';
import RatingBox from './RatingBox';
type Props = any;
const RatingAndCommentBox: FunctionComponent<Props> = (props) => {
  return (
    <div className="rounded-md shadow-xl mb-4 p-3">
      <p className="font-semibold text-lg m-0 p-[10px]">Đánh giá & nhận xét</p>
      <RatingBox />
    </div>
  );
};

export default RatingAndCommentBox;
