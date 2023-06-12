import { FC, Fragment, useState } from 'react';
import Avatar from '../Avatar';
import Username from '../links/Username';
import Imagecontainer from './Imagecontainer';
import {
  CommentIcon,
  LikesIconIn,
  SaveIconIn,
  SaveIconOut,
} from '../icons/Svg';
import { Post } from '@/lib/interfaces';
import TextAreaAutosize from 'react-textarea-autosize';

import EditPostMenu from './EditPostMenu';
import CommentItem from './CommentItem';

interface PostContainerProps {
  post: Post;
  handleLike: () => void;
  isLiked: boolean;
  handleSaved: () => void;
  isSaved: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleComment: () => void;
  willEdit: boolean;
  setWillEdit: (value: boolean) => void;
  setCommentToDeleteId: (value: string) => void;
}

const PostContainer: FC<PostContainerProps> = ({
  post,
  handleLike,
  isLiked,
  handleSaved,
  isSaved,
  inputValue,
  setInputValue,
  handleComment,
  willEdit,
  setWillEdit,
  setCommentToDeleteId,
}) => {
  return (
    <div className="h-full  md:h-[calc(100vh-60px)] md:flex md:items-center md:justify-center md:w-5/6 lg:w-3/4 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-6 md:shadow-app-shadow">
        <div className="flex items-center justify-between px-2 py-1 md:col-start-2 md:row-span-1 md:shadow-app-bottom">
          <div className="flex items-center gap-4">
            <Avatar userId={post.user._id} imageUrl={post.user.image} />
            <Username id={post.user._id} username={post.user.name} />
          </div>
          <div>
            {!willEdit ? (
              <EditPostMenu
                onEdit={setWillEdit}
                onDelete={() => console.log('deleted')}
              />
            ) : (
              <button
                onClick={() => setWillEdit(false)}
                className="text-app-blue right-2 disabled:text-opacity-50"
              >
                SAVE
              </button>
            )}
          </div>
        </div>
        <div className="md:row-start-1 md:row-span-6 md:p-[1px]">
          <Imagecontainer image={post.image} />
        </div>
        <div className="relative overflow-x-auto md:col-start-2 md:row-span-5 scrollbar-thumb-blue-500 scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-gray-900 ">
          <div className="md:absolute md:w-full md:h-full md:flex md:flex-col ">
            <div className="p-2 shadow-app-bottom">
              <div className="flex justify-between ">
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
                  className={`w-full bg-transparent resize-none p-2 rounded-md focus:outline-none ${
                    willEdit && 'ring-2 '
                  }`}
                  disabled={!willEdit}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 px-2 grow ">
              {/* {post.comments.length > 1 && !isAllCommentsShowed && (
          <div className="mt-1">
            <button
              onClick={() => setIsAllCommentsShowed(true)}
              className="text-sm text-gray-200 text-opacity-50 "
            >
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
        )} */}
              {/* {post.comments.length > 1 && isAllCommentsShowed && ( */}
              <ul className="space-y-5">
                {post.comments.map((comment) => (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    post={post}
                    setCommentToDeleteId={setCommentToDeleteId}
                  />
                ))}
              </ul>
              {/* )} */}
              {/* {post.comments.length === 1 && (
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
        )} */}
            </div>
            <div className="flex items-center p-1 mt-2 md:mt-0 shadow-app-top">
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
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
