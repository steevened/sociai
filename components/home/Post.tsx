import Image from 'next/image';
import Avatar from '../Avatar';
import Username from '../links/Username';
import MenuDropdown from '../MenuDropdown';
import { LikesIconIn } from '../icons/Svg';

interface Props {
  children?: React.ReactNode;
  id: number;
  username: string;
  className?: string;
}

const Post = ({ className, id, username }: Props) => {
  return (
    <div
      className={`w-9/12 min-w-[300px] mx-auto  shadow-app-bottom my-8 pb-6 ${className}`}
    >
      <div className="flex items-center gap-3 ">
        <Avatar />
        <div className="flex flex-grow gap-2 text-base">
          <Username username={username} />
          <p className="text-sm text-gray-500">1d</p>
        </div>
        <div className="">
          <MenuDropdown />
        </div>
      </div>

      <div className="mt-4 shadow-app-image">
        <Image
          src="https://images.unsplash.com/photo-1621500917010-3915ad3cabbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
          alt="photo"
          width={500}
          height={500}
        />
      </div>
      <div className="px-4 mt-4">
        <div className="flex">
          <div className="flex items-center gap-4 grow">
            <button>
              <LikesIconIn />
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </button>
          </div>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <div>
            <button className="text-sm font-semibold text-gray-500">
              34 stars
            </button>
          </div>
          <div>
            <div className="text-sm">
              <Username username={username} className="mr-1" />
              <span className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quod.
              </span>
            </div>
          </div>
          <div className="mt-1">
            <button className="text-sm text-gray-500 ">
              View all 12 comments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
