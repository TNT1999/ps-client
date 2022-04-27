import { SendIcon } from '@assets/icons';
import { ChangeEvent, FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import { Descendant } from 'slate';

const CommentEditor = dynamic(
  () => import('@components/editor/CommentEditor'),
  { ssr: false }
);

type Props = {
  value: Descendant[];
  onChange: (e: Descendant[]) => void;
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
      <CommentEditor value={value} onChange={onChange} />
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
