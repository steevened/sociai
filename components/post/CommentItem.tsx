import { FC, useEffect, useState } from 'react';
import Username from '../links/Username';
import TextAreaAutosize from 'react-textarea-autosize';
import { Comment, Post } from '@/lib/interfaces';
import EditPostMenu from './EditPostMenu';
import Button from '../atoms/Button';
import { updateComment } from '@/lib/services';
import { usePostById } from '@/lib/hooks';
import { toast } from 'sonner';
import { LoadIcon } from '../icons/Svg';

interface CommentItemProps {
  comment: Comment;
  post: Post;
}

const CommentItem: FC<CommentItemProps> = ({ comment, post }) => {
  const [willEditComment, setWillEditComment] = useState<boolean>(false);
  const [isCommentChanged, setIsCommentChanged] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>(comment.comment);
  const [loadingUpdateComment, setLoadingUpdateComment] =
    useState<boolean>(false);

  const { mutate } = usePostById(post._id);

  const onUpdate = () => {
    setLoadingUpdateComment(true);
    updateComment(post._id, comment._id, inputValue)
      .then(() => {
        setLoadingUpdateComment(false);
        setWillEditComment(false);
        mutate();
      })
      .catch((error) => {
        setLoadingUpdateComment(false);
        toast.error('Failed to update comment');
        console.log(error);
      });
  };

  useEffect(() => {
    const isChanged = inputValue === comment.comment;
    setIsCommentChanged(!isChanged);
  }, [comment, inputValue]);

  return (
    <li className="flex items-center justify-between gap-2 mt-1">
      <div>
        <Username
          id={post.comments[0].user._id}
          username={post.comments[0].user.name}
        />
      </div>
      <div className="w-full ">
        <TextAreaAutosize
          value={inputValue}
          disabled={!willEditComment}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a comment..."
          className={`w-full h-full p-2 text-sm text-gray-200 bg-black resize-none focus:outline-none text-opacity-70  bg-transparent  rounded-md  flex items-center ${
            willEditComment && 'ring-2'
          }`}
        />

        {willEditComment && (
          <div className="flex items-center gap-4 mt-2">
            <Button
              onClick={() => {
                setWillEditComment(false);
                setInputValue(comment.comment);
              }}
              color="secondary"
            >
              CANCEL
            </Button>
            <Button
              className="flex items-center gap-2"
              onClick={onUpdate}
              disabled={!isCommentChanged}
            >
              {loadingUpdateComment ? (
                <>
                  <span>
                    <LoadIcon />
                  </span>
                  SAVING
                </>
              ) : (
                'SAVE'
              )}
            </Button>
          </div>
        )}
      </div>
      {!willEditComment && (
        <div>
          <EditPostMenu onEdit={() => setWillEditComment(true)} />
        </div>
      )}
    </li>
  );
};

export default CommentItem;
