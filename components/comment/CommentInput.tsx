import { SendIcon } from '@assets/icons';
import { FunctionComponent } from 'react';
type Props = any;
const CommentInput: FunctionComponent<Props> = () => {
  return (
    <div className="w-full flex px-3 py-3">
      <textarea
        className="w-full rounded-md border shadow py-[6px] px-[10px]"
        placeholder="Xin mời để lại câu hỏi, CellphoneS sẽ trả lời ngay trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau."
        rows={4}
        cols={5}
      ></textarea>
      <button className="flex items-center justify-center bg-red-600 rounded-md text-white h-8 w-16 ml-3">
        <SendIcon />
        &nbsp;Gửi
      </button>
    </div>
  );
};

export default CommentInput;
