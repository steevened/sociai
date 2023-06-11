import { FC } from 'react';
import Avatar from '../Avatar';
import Username from '../links/Username';
import Imagecontainer from './Imagecontainer';
import {
  CommentIcon,
  LikesIconIn,
  SaveIconIn,
  SaveIconOut,
} from '../icons/Svg';
import { Post, User } from '@/lib/interfaces';
import TextAreaAutosize from 'react-textarea-autosize';

interface PostMobileProps {
  post: Post;
  handleLike: () => void;
  isLiked: boolean;
  handleSaved: () => void;
  isSaved: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleComment: () => void;
}

const PostMobile: FC<PostMobileProps> = ({
  post,
  handleLike,
  isLiked,
  handleSaved,
  isSaved,
  inputValue,
  setInputValue,
  handleComment,
}) => {
  return (
    <div className="">
      <div className="flex items-center justify-start gap-4 px-2 py-1 ">
        <Avatar userId={post.user._id} imageUrl={post.user.image} />
        <Username id={post.user._id} username={post.user.name} />
      </div>
      <Imagecontainer image={post.image} />
      <div className="flex justify-between p-2">
        <div className="flex items-center gap-4 ">
          <button onClick={handleLike}>
            <LikesIconIn liked={isLiked} />
          </button>
          <label htmlFor="comment" role="button">
            <CommentIcon />
          </label>
        </div>
        <button onClick={handleSaved}>
          {isSaved ? <SaveIconOut /> : <SaveIconIn />}
        </button>
      </div>
      <div className="flex flex-col gap-1 px-2 ">
        <div>
          <span className="text-xs font-semibold">
            {post.likes.length} like{post.likes.length !== 1 && 's'}
          </span>
        </div>

        <div className="flex items-center text-sm">
          <Username
            username={post.user.name}
            id={post.user._id}
            className="mr-1"
          />
          <TextAreaAutosize
            value={post.caption}
            className="w-full bg-transparent resize-none "
            disabled
          >
            {post.caption}
          </TextAreaAutosize>
        </div>

        {post.comments.length > 1 && (
          <div className="mt-1">
            <button className="text-sm text-gray-200 text-opacity-50 ">
              View all {post.comments.length} comments
            </button>
            <div className="flex items-center mt-1">
              <Username
                id={post.comments[0].user._id}
                username={post.comments[0].user.name}
              />
              <p className="inline ml-1 text-sm text-gray-200 text-opacity-70">
                {post.comments[0].comment.slice(0, 40)}
                {post.comments[0].comment.length > 39 && '...'}
              </p>
            </div>
          </div>
        )}
        {post.comments.length === 1 && (
          <div className="flex items-center mt-1">
            <Username
              id={post.comments[0].user._id}
              username={post.comments[0].user.name}
            />
            <p className="inline ml-1 text-sm text-gray-200 text-opacity-70">
              {post.comments[0].comment.slice(0, 40)}
              {post.comments[0].comment.length > 39 && '...'}
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center p-1 mt-2 md:mt-0">
        <TextAreaAutosize
          id="comment"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a comment..."
          className="w-full h-full p-2 bg-black resize-none focus:outline-none "
        />
        <button
          onClick={handleComment}
          disabled={inputValue.length <= 0}
          className="text-app-blue right-2 disabled:text-opacity-50"
        >
          POST
        </button>
      </div>
    </div>
  );
};

export default PostMobile;
