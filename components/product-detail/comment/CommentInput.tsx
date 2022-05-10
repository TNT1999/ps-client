import { SendIcon } from '@assets/icons';
import { ChangeEvent, FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import { Descendant } from 'slate';

// const CommentEditor = dynamic(
//   () => import('@components/editor/CommentEditor'),
//   { ssr: false }
// );

type Props = {
  value: string;
  onChange: (e: any) => void;
  onSend: () => void;
  width?: string;
};
const CommentInput: FunctionComponent<Props> = ({
  value,
  onChange,
  onSend,
  width
}) => {
  return (
    <div className="w-full flex px-3 py-3" style={{ width }}>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Xin mời để lại câu hỏi, CellphoneS sẽ trả lời ngay trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau."
      />
      <button
        className="flex items-center justify-center bg-red-600 rounded-md text-white h-8 w-16 ml-3"
        onClick={onSend}
      >
        <SendIcon />
        &nbsp;Gửi
      </button>
    </div>
  );
};

export default CommentInput;
