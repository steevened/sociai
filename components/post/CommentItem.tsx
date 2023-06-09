import { FC, useContext, useEffect, useState } from 'react';
import Username from '../links/Username';
import TextAreaAutosize from 'react-textarea-autosize';
import { Comment, Post } from '@/lib/interfaces';
import EditPostMenu from './EditPostMenu';
import Button from '../atoms/Button';
import { deleteComment, updateComment } from '@/lib/services';
import { usePostById } from '@/lib/hooks';
import { toast } from 'sonner';
import { LoadIcon } from '../icons/Svg';
import { useUiStore } from '@/store/uiStore/uiStore';
import { AuthContext } from '@/context';

interface CommentItemProps {
  comment: Comment;
  post: Post;
  //this function will be a promise of type unknown
  // onDeleteComment: (commentId: string) => Promise<string | number | undefined>;
}

const CommentItem: FC<CommentItemProps> = ({
  comment,
  post,
  // onDeleteComment,
}) => {
  const [willEditComment, setWillEditComment] = useState<boolean>(false);
  const [isCommentChanged, setIsCommentChanged] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>(comment.comment);
  const [loadingUpdateComment, setLoadingUpdateComment] =
    useState<boolean>(false);

  const [isLoadingDeleteComment, setIsLoadingDeleteComment] =
    useState<boolean>(false);

  const { mutate } = usePostById(post._id);

  const { user, isLogged } = useContext(AuthContext);

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

  console.log(isLoadingDeleteComment);

  useEffect(() => {
    const isChanged = inputValue === comment.comment;
    setIsCommentChanged(!isChanged);
  }, [comment, inputValue]);

  return (
    <li className="flex items-center justify-between gap-2 mt-1 ">
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
                </>
              ) : (
                'SAVE'
              )}
            </Button>
          </div>
        )}
      </div>

      {user?._id === comment.user._id && isLogged && !willEditComment && (
        <div>
          <EditPostMenu
            onEdit={() => setWillEditComment(true)}
            onDelete={() => {
              toast.custom((t) => (
                <div className="w-full p-2 bg-black rounded-md shadow-app-shadow min-w-[300px]">
                  <h1 className="font-medium text-center">
                    This comment will be deleted
                  </h1>
                  <div className="flex justify-center gap-2 mt-2">
                    <Button color="primary" onClick={() => toast.dismiss(t)}>
                      Cancel
                    </Button>
                    <Button
                      color="danger"
                      className=""
                      onClick={() => {
                        setIsLoadingDeleteComment(true);
                        deleteComment(post?._id, comment?._id)
                          .then(() => {
                            mutate();
                            toast.dismiss(t);
                            setIsLoadingDeleteComment(false);
                            toast.success('Comment deleted');
                          })
                          .catch((error) => {
                            console.log(error);
                            setIsLoadingDeleteComment(false);
                            toast.error('Failed to delete comment');
                          });
                      }}
                    >
                      {isLoadingDeleteComment ? (
                        <span>
                          <LoadIcon />
                        </span>
                      ) : (
                        <p>Confirm</p>
                      )}
                    </Button>
                  </div>
                </div>
              ));
            }}
          />
        </div>
      )}
    </li>
  );
};

export default CommentItem;
