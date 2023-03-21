import Layout from '@/components/Layout';
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';
import PostForm from '@/components/home/PostForm';
import Post from '@/components/home/Post';

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
  return (
    <div className="mx-4 mb-36">
      <PostForm className="mt-4" />

      {posts.map((post) => (
        <Post key={post.id} username={post.username} id={post.id} />
      ))}
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
