import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logo from '../public/social-media.png';
import Card from './atoms/Card';
import {
  HomeIconIn,
  HomeIconOut,
  LikesIconIn,
  LikesIconOut,
  MsgsIn,
  MsgsOut,
  SaveIconIn,
  SaveIconOut,
} from './icons/Svg';

export default function NavigationCard() {
  const router = useRouter();

  const { pathname } = router;

  const isHome = pathname === '/';
  const isNotifications = pathname === '/notifications';
  const isMessages = pathname === '/messages';
  const isSaved = pathname === '/saved';

  const className = 'duration-100 active:scale-95 hover:scale-105';

  return (
    <div className="container fixed inset-x-0 bottom-0 z-50 flex items-center justify-between px-4 py-3 mx-auto duration-200 bg-black shadow-app-top md:hidden">
      <Link className={`${className} `} href="/">
        {isHome ? <HomeIconOut /> : <HomeIconIn />}
      </Link>
      <Link className={`${className} `} href="/notifications">
        {isNotifications ? <LikesIconOut /> : <LikesIconIn />}
      </Link>

      <Link className={`${className} `} href="/messages">
        {isMessages ? <MsgsOut /> : <MsgsIn />}
      </Link>
      <Link className={`${className} `} href="/saved">
        {isSaved ? <SaveIconOut /> : <SaveIconIn />}
      </Link>
      <Link className={`${className} `} href="/profile/steevened">
        <div className="w-6 h-6 bg-white rounded-full " />
      </Link>
    </div>
  );
}
