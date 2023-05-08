import Layout from '@/components/Layout';
import { NextPageWithLayout } from './_app';
import { ReactElement, useEffect, useState } from 'react';
import PostForm from '@/components/home/PostForm';
import Post from '@/components/home/Post';
import { useRouter } from 'next/router';
import { AddPostIn, InstagramTextLogo } from '@/components/icons/Svg';

interface IPost {
  id: number;
  username: string;
}

const posts: IPost[] = [
  {
    id: 1,
    username: 'steeven',
  },
  {
    id: 2,
    username: 'mike',
  },
  {
    id: 3,
    username: 'john',
  },
  {
    id: 4,
    username: 'jane',
  },
];

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <div className="mb-36">
      {/* <PostForm className="mt-4" /> */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 bg-black shadow-app-bottom">
        <button onClick={() => router.push('/')} className="">
          <InstagramTextLogo />
        </button>

        <button>
          <AddPostIn />
        </button>
        {/* <h1 className="font-bold text-center">{title}</h1> */}
      </div>

      <div className="my-20 ">
        {posts.map((post) => (
          <Post key={post.id} username={post.username} id={post.id} />
        ))}
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
