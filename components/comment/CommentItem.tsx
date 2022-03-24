import { ClockIcon, MessageSquareIcon } from '@assets/icons';
import { FunctionComponent } from 'react';
type Props = any;
const CommentItem: FunctionComponent<Props> = (props) => {
  return (
    <div className="flex flex-col p-3">
      <div className="flex items-center mb-[10px] justify-between">
        <div className="flex items-center">
          {/* <div>Avatar</div> */}
          <p className="m-0 text-sm font-medium">Vũ Thanh</p>
        </div>
        <p className="flex items-center text-sm m-0">
          <ClockIcon />
          &nbsp;2 ngày trước
        </p>
      </div>
      <div className="flex flex-col p-[10px] w-[calc(100%-32px)] self-end shadow-md rounded bg-white">
        <p className="m-0">
          Cho e hỏi em mua xs 256 bên shop thu cũ đổi mới thêm bao nhiêu tiền ạ!
        </p>
        <button className="flex items-center justify-center rounded-md self-end text-red-500 ml-3">
          <MessageSquareIcon className="text-red-500 w-4 h-4" />
          &nbsp;Trả lời
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
