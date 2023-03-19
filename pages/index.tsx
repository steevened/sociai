import Layout from '@/components/Layout';
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';
import PostFormCard from '@/components/PostFormCard';
import PostCard from '@/components/PostCard';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <PostFormCard />
      <PostCard />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
