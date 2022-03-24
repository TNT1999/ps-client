import { ChevronDownIcon } from '@assets/icons';
import Comment from '@components/comment/Comment';
import CommentInput from '@components/comment/CommentInput';
import { FunctionComponent } from 'react';
type Props = any;
const QuestionBox: FunctionComponent<Props> = (props) => {
  return (
    <div className="rounded-md shadow-xl">
      <p className="font-semibold text-lg m-0 p-[10px]">Hỏi và đáp</p>
      <CommentInput />
      <div className="flex flex-col bg-gray-50">
        <Comment />
        <button className="flex w-80 mb-4 mt-1 self-center justify-center items-center text-sm text-center py-2 px-6 outline-none shadow-md rounded-md">
          <span>Xem thêm</span>
          <ChevronDownIcon />
        </button>
      </div>
    </div>
  );
};
export default QuestionBox;
