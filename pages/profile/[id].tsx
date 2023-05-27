import TopBar from '@/components/atoms/TopBar';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { ReactNode, useContext, useEffect, useState } from 'react';
import ImgsGrid from '@/components/temp/ImgsGrid';
import { Menu } from '@headlessui/react';
import { ConfigLogo } from '@/components/icons/Svg';
import { NextPageWithLayout } from '../_app';
import Avatar from '@/components/Avatar';
import { AuthContext } from '@/context';
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { Post, User } from '@/models';
import { IPost, IUser } from '@/lib/interfaces';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { db } from '@/lib/db';
import Button from '@/components/atoms/Button';
import ConfigMenu from '@/components/profile/ConfigMenu';

interface Props {
  posts: IPost[];
  user: IUser;
  isUserLoggedProfile: boolean;
}

const UserProfile: NextPageWithLayout<Props> = ({
  posts,
  user,
  isUserLoggedProfile,
}) => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();
  // const { id } = router.query;

  console.log(isUserLoggedProfile);

  return (
    <div className="mb-10">
      <TopBar title={user.name} />
      <div className="relative grid grid-cols-3 grid-rows-2 gap-5 mx-4 mt-8 ">
        <div className="flex items-center justify-center col-span-1 col-start-1 lg:row-span-2">
          <Avatar imageUrl={user.image as string} className="w-20 lg:w-40" />
        </div>
        <div className="">
          <h2 className="text-xl">{user.name}</h2>
        </div>
        <div className="w-full col-span-4 lg:col-span-2 ">
          <p className="text-sm font-thin">
            some text representing the profile description
          </p>
        </div>
        {/* <div className="absolute right-0">
          <ConfigMenu />
        </div> */}

        {/* <div className="grid grid-cols-2 gap-8 ">
          <Avatar imageUrl={user.image as string} className="w-20 lg:w-40" />
          <div className="flex flex-col justify-between gap-2 lg:items-center lg:flex-row lg:gap-5 h-fit ">
            <h2 className="text-xl">{user.name}</h2>
            <div className="flex gap-4 ">
              <Button
                color="secondary"
                variant="normal"
                className="font-semibold"
              >
                Edit profile
              </Button>
            </div>
          </div>
          <div className="mt-8 text-sm ">
            <p className="font-thin">
              some text representing the profile description
            </p>
          </div>
        </div> */}
      </div>
      <div className="relative flex justify-around py-2 mt-4 text-sm text-center shadow-app-top after:absolute after:inset-0 after:shadow-app-bottom after:pointer-events-none">
        <div className="">
          <p className="font-semibold">{posts.length}</p>
          <p className="text-gray-500">posts</p>
        </div>
        <button className="">
          <p className="font-semibold">12</p>
          <p className="text-gray-500">followers</p>
        </button>
        <button className="">
          <p className="font-semibold">12</p>
          <p className="text-gray-500">following</p>
        </button>
      </div>
      <ImgsGrid className="mt-4" posts={posts} />
    </div>
  );
};

const Btn = ({ text }: { text: string }) => {
  return (
    <Button color="secondary" variant="normal" className="font-semibold ">
      {text}
    </Button>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const { id } = query;
  const session = await getServerSession(req, res, authOptions);

  await db.connect();
  const posts = await Post.find({ user: id }).sort({ createdAt: -1 });
  const user = await User.findById(id);
  const isUserLoggedProfile = session?.user?.email === user?.email;
  await db.disconnect();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      user: JSON.parse(JSON.stringify(user)),
      isUserLoggedProfile,
    },
  };
};

UserProfile.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};

export default UserProfile;
