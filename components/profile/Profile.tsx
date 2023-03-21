import React from 'react';
import { useRouter } from 'next/router';
import Card from '../Card';
import Image from 'next/image';
import Avatar from '../Avatar';
import Link from 'next/link';

export default function ProfileInfo() {
  const router = useRouter();
  const { pathname } = router;

  const isPost = pathname === '/profile';
  const isAbout = pathname === '/profile/about';
  const isFriends = pathname === '/profile/friends';
  const isPhotos = pathname === '/profile/photos';

  const tabClass = 'flex hover:bg-gray-100 rounded-md duration-200';
  const activeClass =
    'border-b-4 border-b-app-blue text-app-blue font-bold duration-100';

  return (
    <Card className="p-0 overflow-hidden relative">
      <div className="h-36 overflow-hidden flex items-center justify-center">
        <Image
          width={1000}
          height={700}
          src="https://images.unsplash.com/photo-1672775666561-50fa6e061e01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=875&q=80"
          alt="profile background"
        />
      </div>
      <div className="absolute top-20 left-4">
        <Avatar className="w-32" />
      </div>
      <div className="p-4 pb-0">
        <div className="ml-[130px]">
          <h1 className="text-3xl font-bold">Steven Elias</h1>
          <p className="text-gray-500 leading-4">Ecuador</p>
        </div>
        <ul className="mt-5 flex gap-0">
          <li className={isPost ? activeClass : tabClass}>
            <Link
              href="/profile"
              className="flex gap-1 px-5 py-1  items-center"
            >
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
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>

              <button>Posts</button>
            </Link>
          </li>
          <li className={isAbout ? activeClass : tabClass}>
            <Link
              href="/profile/about"
              className="flex gap-1 px-5 py-1 items-center"
            >
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
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>

              <button>About</button>
            </Link>
          </li>
          <li className={isFriends ? activeClass : tabClass}>
            <Link
              href="/profile/friends"
              className="flex gap-1 px-5 py-1  items-center"
            >
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
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>

              <button>Friends</button>
            </Link>
          </li>
          <li className={isPhotos ? activeClass : tabClass}>
            <Link
              href="/profile/photos"
              className="flex gap-1 px-5 py-1  items-center"
            >
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
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>

              <button>Photos</button>
            </Link>
          </li>
        </ul>
      </div>
    </Card>
  );
}
