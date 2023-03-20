import Layout from '@/components/Layout';
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';
import PostFormCard from '@/components/PostFormCard';
import PostCard from '@/components/PostCard';
import PostForm from '@/components/home/PostForm';
import Post from '@/components/home/Post';

const Home: NextPageWithLayout = () => {
  return (
    <div className="mx-4 ">
      <PostForm />
      <Post className="" />
      <Post className="" />
      <Post className="" />
      <Post className="" />
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
