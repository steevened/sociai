import Layout from '@/components/Layout';
import { NextPageWithLayout } from './_app';
import { ReactElement } from 'react';
import Post from '@/components/home/Post';
import { useRouter } from 'next/router';
import { AddPostIn, InstagramTextLogo } from '@/components/icons/Svg';
import { useSession } from 'next-auth/react';

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
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 bg-black shadow-app-bottom md:hidden">
        <button onClick={() => router.push('/')} className="">
          <InstagramTextLogo />
        </button>

        <button>
          <AddPostIn />
        </button>
      </div>

      <div className="flex flex-col items-center my-20 space-y-10 md:my-10">
        {posts.map(({ id, username }) => (
          <Post key={id} username={username} id={id} />
        ))}
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
