import Image from 'next/image';
import Avatar from '../Avatar';
import Username from '../links/Username';
import MenuDropdown from '../MenuDropdown';
import { CommentIcon, LikesIconIn, SaveIconIn } from '../icons/Svg';
import { User } from '@/lib/interfaces/user-response.interface';
import { IPost, Post } from '@/lib/interfaces';
import { FC } from 'react';
import alternAvatar from '../../public/avatar.jpg';
import { toggleLike } from '@/lib/services';

interface Props {
  post: Post;
  className?: string;
  mutate: () => void;
}

const Post: FC<Props> = ({ className, post, mutate }) => {
  const handleLike = async () => {
    try {
      const res = await toggleLike(post._id);
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`w-[350px] shadow-app-bottom pb-6 ${className}`}>
      <div className="flex items-center gap-3">
        <Avatar imageUrl={post.user.image} />
        <div className="flex flex-grow gap-2 text-base">
          <Username username={post.user.name} id={post.user._id} />
          <p className="text-sm text-gray-500">1d</p>
        </div>
        <div className="">
          <MenuDropdown />
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
              <LikesIconIn />
            </button>
            <button>
              <CommentIcon />
            </button>
          </div>
          <button>
            <SaveIconIn />
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
