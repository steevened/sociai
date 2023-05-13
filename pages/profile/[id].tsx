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
import { signIn, useSession } from 'next-auth/react';
import { useUserById } from '@/lib/hooks';

const UserProfile: NextPageWithLayout = () => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;
  const { status } = useSession();

  const { error, isLoading, user } = useUserById(id as string);

  console.log(user);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [router, status]);

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="">
      <TopBar title={user.email.split('@')[0]} />
      <div className="relative mx-4 mt-8">
        <div className="absolute right-0">
          <Menu>
            <Menu.Button>
              <ConfigLogo />
            </Menu.Button>
            <Menu.Items
              as="div"
              className="absolute right-0 p-2 bg-black rounded-md shadow-app-shadow w-28"
            >
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      logout();
                      router.push('/');
                    }}
                    className={`${
                      active ? 'bg-gray-900' : ''
                    } block w-full text-left px-4 py-2 text-sm rounded-md`}
                  >
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
        <div className="flex gap-8">
          <Avatar imageUrl={user.image as string} className="w-20" />
          <div className="flex flex-col justify-between">
            <h2 className="text-xl">{user.email.split('@')[0]}</h2>
            <div className="flex gap-4 ">
              {/* <Btn text="Following" /> */}
              <button
                className="px-2 border border-white rounded-md"
                onClick={() => {
                  signIn();
                }}
              >
                Sign in
              </button>
              <Btn text="Message" />
            </div>
          </div>
        </div>
        <div className="mt-8 text-sm">
          <h3 className="font-semibold">{user.name}</h3>
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
