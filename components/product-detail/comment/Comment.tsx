import { RootState } from '@app/store';
import { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import CommentItem from './CommentItem';
type Props = any;
const Comment: FunctionComponent<Props> = (props) => {
  const comments = useSelector(
    (state: RootState) => state.home.selectedProduct.comments || []
  );
  const [showInputReplyCommentId, setShowInputReplyCommentId] = useState('');
  const setShowReply = (id: string) => () => setShowInputReplyCommentId(id);
  return (
    <>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isReply={false}
          showInputReplyCommentId={showInputReplyCommentId}
          setShowReply={setShowReply}
        />
      ))}
    </>
  );
};
export default Comment;
