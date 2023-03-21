import TopBar from '@/components/atoms/TopBar';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React from 'react';
import Avatar from '../components/Avatar';
import { NextPageWithLayout } from './_app';
import { ReactNode } from 'react';
import ImgsGrid from '@/components/temp/ImgsGrid';

const UserProfile: NextPageWithLayout = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className="">
      <TopBar title={username} />
      <div className="mx-4 mt-8">
        <div className="flex gap-8">
          <Avatar className="w-20" />
          <div className="flex flex-col justify-between">
            <h2 className="text-xl">{username}</h2>
            <div className="flex gap-4 ">
              <Btn text="Following" />
              <Btn text="Message" />
            </div>
          </div>
        </div>
        <div className="mt-8 text-sm">
          <h3 className="font-semibold">Firstname Lastname</h3>
          <p className="font-thin">
            some text representing the profile description
          </p>
        </div>
      </div>
      <div className="relative flex justify-around py-2 mt-4 text-sm text-center shadow-app-top after:absolute after:inset-0 after:shadow-app-bottom after:pointer-events-none">
        <div className="">
          <p className="font-semibold">12</p>
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
      <ImgsGrid className="mt-4" />
    </div>
  );
};

const Btn = ({ text }: { text: string }) => {
  return (
    <button className="px-4 py-1 font-semibold text-black bg-gray-300 rounded-md">
      {text}
    </button>
  );
};

UserProfile.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
};

export default UserProfile;
