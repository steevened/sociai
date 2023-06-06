import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  AddPostIn,
  AddPostOut,
  HomeIconIn,
  HomeIconOut,
  IgLogoIcon,
  InstagramTextLogo,
  LikesIconIn,
  LikesIconOut,
  LogInIcon,
  MsgsIn,
  MsgsOut,
  SaveIconIn,
  SaveIconOut,
} from './icons/Svg';
import { ReactNode, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { AuthContext } from '@/context';
import Image from 'next/image';
import { useUserByEmail } from '@/lib/hooks';
import avatar from '../public/avatar.jpg';

interface Route {
  name: string;
  path: string;
  iconActive: ReactNode;
  iconInactive: ReactNode;
}

const routes: Route[] = [
  {
    name: 'Home',
    path: '/',
    iconActive: <HomeIconIn />,
    iconInactive: <HomeIconOut />,
  },
  // {
  //   name: 'Notifications',
  //   path: '/notifications',
  //   iconActive: <LikesIconIn />,
  //   iconInactive: <LikesIconOut />,
  // },
  // {
  //   name: 'Messages',
  //   path: '/messages',
  //   iconActive: <MsgsIn />,
  //   iconInactive: <MsgsOut />,
  // },
  {
    name: 'Create',
    path: '/create',
    iconActive: <AddPostIn />,
    iconInactive: <AddPostOut />,
  },
  {
    name: 'Saved',
    path: '/saved',
    iconActive: <SaveIconIn />,
    iconInactive: <SaveIconOut />,
  },
];

export default function NavigationCard() {
  const { data, status } = useSession();
  const { isLogged, user: userLogged } = useContext(AuthContext);

  const { user, error, isLoading } = useUserByEmail(
    userLogged?.email as string
  );

  // console.log(user);

  const router = useRouter();

  const { pathname } = router;

  const className =
    'p-3 duration-100 rounded-md md:hover:bg-zinc-900 active:scale-[0.99]';

  const currentRoute = () => {
    switch (pathname) {
      case '/':
        return 'home';
      case '/notifications':
        return 'notifications';
      case '/messages':
        return 'messages';
      case '/create':
        return 'create';
      case '/saved':
        return 'saved';
      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-0 z-50 w-full bg-black shadow-app-top md:inset-y-0 md:w-fit md:left-0 md:shadow-app-right xl:w-60 ">
      <div className="items-center justify-center hidden py-6 md:flex xl:justify-start ">
        <Link
          href="/"
          className="p-3 duration-100 rounded-md md:hover:bg-zinc-900 active:scale-[0.99] xl:hover:bg-transparent"
        >
          <span className="xl:hidden">
            <IgLogoIcon />
          </span>
          <span className="hidden xl:block">
            <InstagramTextLogo />
          </span>
        </Link>
      </div>

      <div className="flex items-center justify-between h-full px-4 py-3 md:flex-col md:px-2 md:justify-start md:gap-4 xl:items-start">
        {routes.map(({ path, name, iconActive, iconInactive }) => (
          <Link
            className={`${className} w-full  flex items-center justify-center xl:justify-start`}
            href={path === '/' ? '/' : isLogged ? path : '/api/auth/signin'}
            key={name}
          >
            <span className="flex items-center gap-3">
              {currentRoute() !== name.toLowerCase()
                ? iconActive
                : iconInactive}
              <p
                className={`hidden text-lg  xl:block ${
                  currentRoute() === name.toLowerCase()
                    ? 'font-semibold'
                    : 'font-normal'
                }`}
              >
                {name}
              </p>
            </span>
          </Link>
        ))}

        <Link
          className={`${className} w-full flex items-center gap-3 justify-center xl:justify-start`}
          href={isLogged ? `/profile/${user?._id}` : '/api/auth/signin'}
        >
          {isLogged ? (
            <>
              <div className="overflow-hidden bg-white rounded-full w-7 h-7">
                <Image
                  src={user?.image || avatar}
                  alt="user profile image"
                  width={28}
                  height={28}
                />
              </div>
              <span
                className={`hidden text-lg  xl:block ${
                  pathname.startsWith('/profile')
                    ? 'font-semibold'
                    : 'font-normal'
                }`}
              >
                <p>Profile</p>
              </span>
            </>
          ) : (
            <>
              <LogInIcon />
              <span className="hidden text-lg xl:block">Log In</span>
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
