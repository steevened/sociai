import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { FC, Fragment } from 'react';
import { CopyIcon, EyeIcon, FaceIcon } from './icons/Svg';

interface Props {
  postId: string;
  isLogged: boolean;
  isPostFromUser: boolean;
}

const MenuDropdown: FC<Props> = ({
  postId,
  isLogged,
  isPostFromUser = false,
}) => {
  const router = useRouter();
  return (
    <Menu as="div" className="relative text-gray-400">
      <Menu.Button className="p-1 duration-100 rounded-full hover:bg-gray-900 active:scale-95 hover:scale-105">
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
            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute p-2 mt-1 space-y-2 bg-black rounded-md -right-1 w-36 shadow-app-shadow">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`flex w-full gap-2 items-center duration-200 px-2 py-2 rounded-md text-sm ${
                  active && 'bg-gray-900'
                }`}
              >
                <CopyIcon />
                Copy Link
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => router.push(`/post/${postId}`)}
                className={`flex w-full gap-2 items-center duration-200 px-2 py-2 rounded-md text-sm ${
                  active && 'bg-gray-900'
                }`}
              >
                <EyeIcon />
                Go to post
              </button>
            )}
          </Menu.Item>
          {isPostFromUser && (
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex w-full gap-2 items-center duration-200  px-2 py-2 rounded-md text-sm text-green-500 ${
                    active && 'bg-gray-900'
                  } `}
                >
                  <>
                    <FaceIcon smile />
                    Follow
                  </>
                </button>
              )}
            </Menu.Item>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuDropdown;
