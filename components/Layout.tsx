import NavigationCard from './NavigationCard';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import ProfileLayout from './profile/ProfileLayout';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { pathname } = router;
  const isProfilePage = pathname.startsWith('/profile');

  // console.log(isProfilePage);

  return (
    <div className="">
      <div className="w-full md:w-3/12">
        <NavigationCard />
      </div>
      <div className="w-full ">{children}</div>
    </div>
  );
}
