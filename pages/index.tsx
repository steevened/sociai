import Layout from '@/components/Layout';
import { NextPageWithLayout } from './_app';
import { ReactElement, useEffect, useState } from 'react';
import PostCard from '@/components/home/Post';
import { useRouter } from 'next/router';
import { InstagramTextLogo } from '@/components/icons/Svg';
import { getPost } from '@/lib/services';
import { IPost } from '@/lib/interfaces';
import { GetServerSideProps } from 'next';
import { Post } from '@/models';
import { db } from '@/lib/db';

interface Props {
  posts: IPost[];
}

const Home: NextPageWithLayout<Props> = ({ posts }) => {
  const router = useRouter();

  // const [posts, setPosts] = useState<IPost[]>([]);

  // useEffect(() => {
  //   getPost()
  //     .then((res) => {
  //       setPosts(res.posts);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  // console.log(posts);

  return (
    <div className="mb-36">
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 bg-black shadow-app-bottom md:hidden">
        <button onClick={() => router.push('/')} className="">
          <InstagramTextLogo />
        </button>
      </div>

      <div className="flex flex-col items-center my-20 space-y-10 md:my-10">
        {posts?.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await db.connect();
  const posts = await Post.find({}).populate('user').sort({ createdAt: -1 });
  await db.disconnect();
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
