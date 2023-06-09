import Image from 'next/image';
import Avatar from '../Avatar';
import Username from '../links/Username';
import MenuDropdown from '../MenuDropdown';
import {
  CommentIcon,
  LikesIconIn,
  SaveIconIn,
  SaveIconOut,
} from '../icons/Svg';
import { User } from '@/lib/interfaces/user-response.interface';
import { IPost, Post } from '@/lib/interfaces';
import { FC, useContext, useEffect, useState } from 'react';
import { createComment, toggleLike, toggleSaved } from '@/lib/services';
import { useSession } from 'next-auth/react';
import { useSaved } from '@/lib/hooks';
import { toast } from 'sonner';
import TextAreaAutosize from 'react-textarea-autosize';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context';

interface Props {
  post: Post;
  className?: string;
  mutate: () => void;
}

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'short',
});

const Post: FC<Props> = ({ className, post, mutate }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  const { user, isLogged } = useContext(AuthContext);

  const router = useRouter();

  const { data: session } = useSession();
  const { data: saved, mutate: mutateSaved } = useSaved();

  const handleLike = async () => {
    if (!session) {
      toast.error('please sign up to continue');
    }
    try {
      const res = await toggleLike(post._id);
      setIsLiked(res.liked);
      console.log(res);
      // console.log(res);
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaved = async () => {
    if (!session) {
      toast.error('please sign up to continue');
    }
    try {
      const res = await toggleSaved(post._id);
      setIsSaved(res.saved);
      mutateSaved();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    if (!inputValue) return;
    if (!session) {
      return toast.error('please sign up to continue');
    }
    try {
      // const res = await createComment(post._id, inputValue);
      toast.promise(createComment(post._id, inputValue), {
        loading: 'Loading...',
        success: () => {
          setInputValue('');
          mutate();
          return 'comment added';
        },
        error: (data) => `${data}`,
      });

      setInputValue('');
      // mutate();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const isLiked = post.likes.some(
      (like) => like.user.email === session?.user?.email
    );
    setIsLiked(isLiked);
  }, [post, session]);

  useEffect(() => {
    const isSaved = saved?.some((s) => s.post._id === post._id);
    setIsSaved(isSaved as boolean);
  }, [post, saved]);

  console.log(post.createdAt);

  return (
    <div className={`w-[350px] shadow-app-bottom pb-6 ${className}`}>
      <div className="flex items-center gap-3">
        <Avatar userId={post.user._id} imageUrl={post.user.image} />
        <div className="flex items-center flex-grow gap-2 text-base">
          <Username username={post.user.name} id={post.user._id} />
          <p className="text-sm text-gray-500">
            <span className="text-gray-400">
              {dateTimeFormatter.format(new Date(post.createdAt))}
            </span>
          </p>
        </div>
        <div className="">
          <MenuDropdown
            postId={post._id}
            isLogged={isLogged}
            isPostFromUser={post.user._id === user?._id}
          />
        </div>
      </div>

      <div
        className="mt-4 overflow-hidden rounded-md shadow-app-image"
        onDoubleClick={handleLike}
      >
        <Image src={post.image} alt="photo" width={1000} height={1000} />
      </div>
      <div className="px-4 mt-4">
        <div className="flex">
          <div className="flex items-center gap-4 grow">
            <button onClick={handleLike}>
              <LikesIconIn liked={isLiked} />
            </button>
            <label role="button" htmlFor="comment-home-page">
              <CommentIcon />
            </label>
          </div>
          <button onClick={handleSaved}>
            {isSaved ? <SaveIconOut /> : <SaveIconIn />}
          </button>
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <div>
            <button className="text-xs font-semibold">
              {post.likes.length} like{post.likes.length !== 1 && 's'}
            </button>
          </div>
          <div>
            <div className="text-sm">
              <Username
                username={post.user.name}
                id={post.user._id}
                className="mr-1"
              />
              <span className="">{post.caption || ''}</span>
            </div>
          </div>
          {post.comments.length > 0 && (
            <div className="mt-1">
              <div className="flex items-center gap-1">
                <Username
                  username={post.comments[0].user.name}
                  id={post.comments[0].user._id}
                />
                <p className="text-sm text-gray-200 text-opacity-70">
                  {post.comments[0].comment.slice(0, 40)}
                  {post.comments[0].comment.length > 39 && '...'}
                </p>
              </div>
              <button
                onClick={() => router.push(`/post/${post._id}`)}
                className="text-sm text-gray-200 text-opacity-50 "
              >
                {/* View all {post.comments.length} comments */}
                View all comments
              </button>
            </div>
          )}
          <div className="flex items-center mt-2">
            <TextAreaAutosize
              id="comment-home-page"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a comment..."
              className="w-full h-full p-2 bg-black resize-none focus:outline-none "
            />
            <button
              onClick={handleComment}
              className={`text-app-blue right-2 ${
                inputValue.length === 0 && 'hidden'
              }`}
            >
              POST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
