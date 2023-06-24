import NavigationCard from './NavigationCard';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { pathname } = router;

  // console.log(isProfilePage);

  return (
    <div className="bg-black">
      <div className="w-full md:w-3/12">
        <NavigationCard />
      </div>
      <div className="md:ml-16 xl:ml-60 ">{children}</div>
    </div>
  );
}
