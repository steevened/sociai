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
import { FC, useEffect, useState } from 'react';
import alternAvatar from '../../public/avatar.jpg';
import { toggleLike, toggleSaved } from '@/lib/services';
import { useSession } from 'next-auth/react';
import { useSaved } from '@/lib/hooks';
import { toast } from 'sonner';

interface Props {
  post: Post;
  className?: string;
  mutate: () => void;
}

const Post: FC<Props> = ({ className, post, mutate }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { data } = useSession();
  const { data: saved, mutate: mutateSaved } = useSaved();

  console.log(data);

  const handleLike = async () => {
    if (!data) {
      toast.error('Please Sign Up to continue');
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
    if (!data) {
      toast.error('Please Sign Up to continue');
    }
    try {
      const res = await toggleSaved(post._id);
      setIsSaved(res.saved);
      mutateSaved();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const isLiked = post.likes.some(
      (like) => like.user.email === data?.user?.email
    );
    setIsLiked(isLiked);
  }, [post, data]);

  useEffect(() => {
    const isSaved = saved?.some((s) => s.post._id === post._id);
    setIsSaved(isSaved as boolean);
  }, [post, saved]);

  return (
    <div className={`w-[350px] shadow-app-bottom pb-6 ${className}`}>
      <div className="flex items-center gap-3">
        <Avatar imageUrl={post.user.image} />
        <div className="flex flex-grow gap-2 text-base">
          <Username username={post.user.name} id={post.user._id} />
          <p className="text-sm text-gray-500">1d</p>
        </div>
        <div className="">
          <MenuDropdown postId={post._id} />
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
            <button>
              <CommentIcon />
            </button>
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
              <button className="text-sm text-gray-200 text-opacity-50 ">
                View all {post.comments.length} comments
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
