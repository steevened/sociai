import Layout from '@/components/Layout';
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';
import PostFormCard from '@/components/PostFormCard';
import PostCard from '@/components/PostCard';

const Home: NextPageWithLayout = () => {
  return (
    <div className="base-colors">
      <PostFormCard />
      <PostCard />
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
