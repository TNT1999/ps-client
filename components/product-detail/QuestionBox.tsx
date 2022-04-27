import { UserInfo } from '@app/slice';
import { postComment } from '@app/slice/homeSlice';
import { RootState, useAppDispatch } from '@app/store';
import { ChevronDownIcon } from '@assets/icons';
import Comment from '@components/product-detail/comment/Comment';
import CommentInput from '@components/product-detail/comment/CommentInput';
import { noop } from 'lodash';
import { useRouter } from 'next/router';
import { FunctionComponent, useMemo, useState } from 'react';
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
  const [comment, setComment] = useState<Descendant[]>(initialValue);
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
        name: currentUser.name || 'Anonymous'
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
      setComment(initialValue);
    }
  };

  return (
    <div className="rounded-md">
      <p className="text-xl font-normal m-0 p-[10px]">Hỏi và đáp</p>
      <CommentInput
        value={comment}
        onChange={(newValue) => setComment(newValue)}
        onSend={handlePostComment}
      />
      <div className="bg-gray-50 text-gray-600 p-3">
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
