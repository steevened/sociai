import Image from 'next/image';
import Avatar from '../Avatar';
import Username from '../links/Username';
import MenuDropdown from '../MenuDropdown';
import { CommentIcon, LikesIconIn, SaveIconIn } from '../icons/Svg';
import { User } from '@/lib/interfaces/user-response.interface';

interface Props {
  user: User;
  className?: string;
}

const Post = ({ className, user }: Props) => {
  return (
    <div className={`w-[350px] shadow-app-bottom pb-6 ${className}`}>
      <div className="flex items-center gap-3">
        <Avatar imageUrl={user.image} />
        <div className="flex flex-grow gap-2 text-base">
          <Username username={user.name} id={user._id} />
          <p className="text-sm text-gray-500">1d</p>
        </div>
        <div className="">
          <MenuDropdown />
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-md shadow-app-image">
        <Image
          src="https://images.unsplash.com/photo-1621500917010-3915ad3cabbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
          alt="photo"
          width={1000}
          height={1000}
        />
      </div>
      <div className="px-4 mt-4">
        <div className="flex">
          <div className="flex items-center gap-4 grow">
            <button>
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
            <button className="text-xs font-semibold">34 likes</button>
          </div>
          <div>
            <div className="text-sm">
              <Username username={user.name} id={user._id} className="mr-1" />
              <span className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quod.
              </span>
            </div>
          </div>
          <div className="mt-1">
            <button className="text-sm text-gray-200 text-opacity-50 ">
              View all 12 comments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
