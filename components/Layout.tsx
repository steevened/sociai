import NavigationCard from './NavigationCard';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import ProfileLayout from './profile/ProfileLayout';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { pathname } = router;
  const isProfilePage = pathname.startsWith('/profile');

  console.log(isProfilePage);

  return (
    <div className="md:flex mt-4 max-w-4xl mx-auto gap-6 mb-24 md:mb-0">
      <div className="w-3/12">
        <NavigationCard />
      </div>
      <div className="w-9/12">
        {isProfilePage ? (
          <ProfileLayout>{children}</ProfileLayout>
        ) : (
          <>{children}</>
        )}
      </div>
    </div>
  );
}
