import { UserInfo } from '@app/slice';
import { postComment } from '@app/slice/homeSlice';
import { RootState, useAppDispatch } from '@app/store';
import { ClockIcon, MessageSquareIcon, SendIcon } from '@assets/icons';
import UserAvatar from '@components/common/Avatar';
import dayjs from '@utils/dayjs';
import { useRouter } from 'next/router';
import { ChangeEvent, FunctionComponent, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { CommentType } from '@types';
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
  marginLeft?: string;
};
const CommentItem: FunctionComponent<Props> = ({
  comment,
  showInputReplyCommentId,
  setShowReply,
  marginLeft
}) => {
  const offset = comment.level >= 1 ? '32px' : '0px';
  const [commentReply, setCommentReply] = useState<string>('');
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
        name: currentUser.name || 'Untitled'
      },
      slug: selectedProduct.slug,
      replyToCommentId: comment.id,
      level: comment.level + 1,
      rootCommentId: comment.rootCommentId || comment.id,
      replyToUser: currentUser.name || 'Untitled'
    };
    try {
      await dispatch(postComment(data)).unwrap();
    } catch (e) {
      noop();
    } finally {
      setCommentReply('');
      setShowReply('')();
    }
  };

  return (
    <div className="flex flex-col mb-4" style={{ marginLeft }}>
      <div className="flex flex-row">
        <UserAvatar name={comment.author.name} />
        <div
          className={classNames('flex flex-col flex-1 ml-3', {
            'mb-4': comment.replies
          })}
        >
          <div className="flex flex-col w-full shadow-sm rounded-md bg-[#fafafa] border p-3">
            <div className="flex items-center justify-between">
              <div className="flex">
                <p className="m-0 text-md font-medium text-[#242424]">
                  {comment.author.name}
                </p>
                {comment.isAdmin && (
                  <span className="ml-2 rounded text-white font-medium bg-primary px-1 text-11 flex items-center justify-center">
                    QTV
                  </span>
                )}
              </div>
              <p className="flex items-center text-sm m-0 font-medium">
                <ClockIcon />
                &nbsp;{dayjs(comment.createdAt).fromNow()}
              </p>
            </div>
            <div className="text-13 font-normal text-[#242424] whitespace-pre-wrap py-3">
              {comment.content}
            </div>
            <button
              className="flex items-center justify-center rounded-md self-end text-red-500 ml-3"
              onClick={setShowReply(comment.id)}
            >
              <MessageSquareIcon className="text-red-500 w-4 h-4" />
              &nbsp;Trả lời
            </button>
          </div>
          {showInputReplyCommentId === comment.id && (
            <div className="flex justify-end w-full mt-4">
              <div className="w-full flex flex-col">
                <textarea
                  rows={3}
                  value={commentReply}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setCommentReply(e.target.value)
                  }
                  className="w-full outline-none border border-gray-300 rounded p-3 mb-2"
                  placeholder="Xin mời để lại câu hỏi, CellphoneS sẽ trả lời ngay trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau."
                />
                <button
                  className="flex self-end items-center justify-center bg-red-600 rounded-md text-white h-10 w-20"
                  onClick={handleReplyComment}
                >
                  <SendIcon className="mr-2 h-5 w-5" />
                  &nbsp;Gửi
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
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
