import { UserInfo } from '@app/slice';
import { postComment } from '@app/slice/homeSlice';
import { RootState, useAppDispatch } from '@app/store';
import { ClockIcon, MessageSquareIcon } from '@assets/icons';
import UserAvatar from '@components/common/Avatar';
import dayjs from '@utils/dayjs';
import { useRouter } from 'next/router';
import { FunctionComponent, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { CommentType } from 'types';
import CommentInput from './CommentInput';
import { Descendant } from 'slate';
import { noop } from 'lodash';
import RenderComment from './RenderComment';
import classNames from 'classnames';
type Props = {
  comment: CommentType;
  isReply: boolean;
  showInputReplyCommentId: string;
  setShowReply: (id: string) => () => void;
  marginLeft: string;
};
const CommentItem: FunctionComponent<Props> = ({
  comment,
  showInputReplyCommentId,
  setShowReply,
  marginLeft
}) => {
  const offset = comment.level >= 1 ? '32px' : '0px';
  const initialValue: Descendant[] = useMemo(
    () => [
      {
        type: 'p',
        children: [{ text: 'this is initial text' }]
      }
    ],
    []
  );
  const [commentReply, setCommentReply] = useState<Descendant[]>(initialValue);
  const currentUser: UserInfo = useSelector(
    (state: RootState) => state.auth.user
  );
  const selectedProduct = useSelector(
    (state: RootState) => state.home.selectedProduct
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleReplyComment = async () => {
    if (!commentReply) {
      return;
    }
    if (!currentUser) {
      //request Login
      router.push('/login');
      return;
    }
    const data = {
      productId: selectedProduct.id,
      content: commentReply,
      author: {
        id: currentUser.id,
        name: currentUser.name || 'Anonymous'
      },
      slug: selectedProduct.slug,
      replyToCommentId: comment.id,
      level: comment.level + 1,
      rootCommentId: comment.rootCommentId || comment.id,
      replyToUser: currentUser.name || 'Anonymous'
    };
    try {
      await dispatch(postComment(data)).unwrap();
    } catch (e) {
      noop();
    } finally {
      setCommentReply(initialValue);
      setShowReply('')();
    }
  };

  return (
    <div className="flex flex-col mb-4" style={{ marginLeft }}>
      <div
        className={classNames('flex flex-row', {
          'mb-4': comment.replies
        })}
      >
        <UserAvatar name={comment.author.name} />
        <div className="flex flex-col w-full ml-3 shadow rounded-lg bg-white p-3">
          <div className="flex items-center justify-between">
            <p className="m-0 text-md font-medium">{comment.author.name}</p>
            <p className="flex items-center text-sm m-0 font-medium">
              <ClockIcon />
              &nbsp;{dayjs(comment.createdAt).fromNow()}
            </p>
          </div>
          <RenderComment nodes={comment.content} />
          <button
            className="flex items-center justify-center rounded-md self-end text-red-500 ml-3"
            onClick={setShowReply(comment.id)}
          >
            <MessageSquareIcon className="text-red-500 w-4 h-4" />
            &nbsp;Trả lời
          </button>
        </div>
      </div>
      {showInputReplyCommentId === comment.id && (
        <div className="flex justify-end">
          <CommentInput
            width={`calc(100% - ${offset}`}
            value={commentReply}
            onChange={(e) => setCommentReply(e)}
            onSend={handleReplyComment}
          />
        </div>
      )}
      {comment.replies &&
        comment.replies.map((reply) => (
          <div key={reply.id}>
            <CommentItem
              marginLeft="48px"
              comment={reply}
              isReply={true}
              showInputReplyCommentId={showInputReplyCommentId}
              setShowReply={setShowReply}
            />
          </div>
        ))}
    </div>
  );
};

export default CommentItem;
