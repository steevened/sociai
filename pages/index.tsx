import Layout from '@/components/Layout';
import { NextPageWithLayout } from './_app';
import { ReactElement, useEffect, useState } from 'react';
import PostCard from '@/components/home/Post';
import { useRouter } from 'next/router';
import { InstagramTextLogo } from '@/components/icons/Svg';
import { usePosts } from '@/lib/hooks';
import { Post } from '@/lib/interfaces';

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  const { posts, isLoading, error, mutate } = usePosts();

  // console.log(posts);

  return (
    <div className="mb-36">
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 bg-black shadow-app-bottom md:hidden">
        <button onClick={() => router.push('/')} className="">
          <InstagramTextLogo />
        </button>
      </div>

      <div className="flex flex-col items-center my-20 space-y-10 ">
        {posts?.map((post: Post) => (
          <PostCard key={post._id} post={post} mutate={mutate} />
        ))}
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
