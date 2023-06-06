import { Post } from '@/lib/interfaces';
import { FC } from 'react';
import Imagecontainer from './Imagecontainer';
import Avatar from '../Avatar';
import Username from '../links/Username';
import {
  CommentIcon,
  LikesIconIn,
  SaveIconIn,
  SaveIconOut,
} from '../icons/Svg';
import TextAreaAutosize from 'react-textarea-autosize';

interface PostDesktopProps {
  post: Post;
  handleLike: () => void;
  isLiked: boolean;
  handleSaved: () => void;
  isSaved: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleComment: () => void;
}

const PostDesktop: FC<PostDesktopProps> = ({
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
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center md:w-5/6 lg:w-3/4 mx-auto">
      <div className="flex shadow-app-shadow">
        <div className="w-1/2 p-[1px]">
          <Imagecontainer image={post.image} />
        </div>
        <div className="relative w-1/2 overflow-y-auto scrollbar-thumb-blue-500 scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-gray-900">
          <div className="sticky flex items-center justify-start gap-4 px-2 py-1.5 shadow-app-bottom z-20 bg-black m-[1px]">
            <Avatar userId={post.user._id} imageUrl={post.user.image} />
            <Username id={post.user._id} username={post.user.name} />
          </div>
          <div className="absolute px-2 text-sm top-32">
            <Username
              username={post.user.name}
              id={post.user._id}
              className="mr-1"
            />
            <span className="">{post.caption}</span>

            {post.comments.length > 0 && (
              <ul className="mt-5 space-y-5">
                {post.comments.map((comment) => (
                  <li key={comment._id} className="flex items-start gap-2">
                    <Avatar
                      imageUrl={comment.user.image}
                      className="w-12 min-w-[48px]"
                      userId={comment.user._id}
                    />
                    <div className="">
                      <Username
                        id={comment.user._id}
                        username={comment.user.name}
                      />{' '}
                      {
                        <p className="inline text-sm text-gray-200 text-opacity-80">
                          {comment.comment}
                        </p>
                      }
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="sticky bottom-0 z-20 bg-black m-[1px] shadow-app-bottom">
            <div className="flex justify-between p-2">
              <div className="flex items-center gap-4 ">
                <button onClick={handleLike}>
                  <LikesIconIn liked={isLiked} />
                </button>
                <label htmlFor="commentDesktop" role="button">
                  <CommentIcon />
                </label>
              </div>
              <button onClick={handleSaved}>
                {isSaved ? <SaveIconOut /> : <SaveIconIn />}
              </button>
            </div>
            <div className="flex items-center p-1 mt-2 md:mt-0 shadow-app-top">
              <TextAreaAutosize
                id="commentDesktop"
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
        </div>
      </div>
    </div>
  );
};

export default PostDesktop;
