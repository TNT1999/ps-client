import { UserInfo } from '@app/slice';
import { postComment } from '@app/slice/homeSlice';
import { RootState, useAppDispatch } from '@app/store';
import { ChevronDownIcon, SendIcon } from '@assets/icons';
import Comment from '@components/product-detail/comment/Comment';
import CommentInput from '@components/product-detail/comment/CommentInput';
import { noop } from 'lodash';
import { useRouter } from 'next/router';
import { ChangeEvent, FunctionComponent, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Descendant } from 'slate';

type Props = any;
const QuestionBox: FunctionComponent<Props> = (props) => {
  const selectedProduct = useSelector(
    (state: RootState) => state.home.selectedProduct
  );
  const currentUser: UserInfo = useSelector(
    (state: RootState) => state.auth.user
  );
  const initialValue: any = useMemo(
    () => [
      {
        type: 'p',
        children: [{ text: 'this is initial text' }]
      }
    ],
    []
  );
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState<string>('');
  const router = useRouter();
  const handlePostComment = async () => {
    if (!comment) {
      return;
    }
    if (!currentUser) {
      //request Login
      router.push('/login');
      return;
    }
    const data = {
      productId: selectedProduct.id,
      content: comment,
      userId: currentUser.id,
      author: {
        id: currentUser.id,
        name: currentUser.name || 'Untitled'
      },
      slug: selectedProduct.slug,
      level: 0,
      replyToCommentId: null,
      rootCommentId: null,
      replyToUser: null
    };
    try {
      await dispatch(postComment(data)).unwrap();
    } catch (e) {
      noop();
    } finally {
      setComment('');
    }
  };

  return (
    <div className="rounded-md">
      <p className="text-xl font-normal m-0 p-[10px]">Hỏi và đáp</p>
      <div className="w-full flex flex-col px-3 py-3">
        <textarea
          rows={3}
          value={comment}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setComment(e.target.value)
          }
          className="w-full outline-none border border-gray-300 rounded p-3 mb-2"
          placeholder="Xin mời để lại câu hỏi, CellphoneS sẽ trả lời ngay trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau."
        />
        <button
          className="flex self-end items-center justify-center bg-red-600 rounded-md text-white h-10 w-20"
          onClick={handlePostComment}
        >
          <SendIcon className="mr-2 h-5 w-5" />
          &nbsp;Gửi
        </button>
      </div>
      <div className="text-gray-600 p-3">
        <Comment />
        {/* <button className="flex w-80 mb-4 mt-1 self-center justify-center items-center text-sm text-center py-2 px-6 outline-none shadow-md rounded-md">
          <span>Xem thêm</span>
          <ChevronDownIcon />
        </button> */}
      </div>
    </div>
  );
};
export default QuestionBox;
