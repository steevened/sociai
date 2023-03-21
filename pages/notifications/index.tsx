import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Arrow from '@/components/icons/Svg';
import Avatar from '../../components/Avatar';
import Username from '@/components/links/Username';
import FollowNotification from '@/components/notifications/FollowNotification';
import LikePostNotification from '../../components/notifications/LikePostNotification';
import CommentNotification from '@/components/notifications/CommentNotification';
import TopBar from '@/components/atoms/TopBar';
const Notifications: NextPageWithLayout = () => {
  return (
    <div className="">
      <TopBar title="Notifications" />
      <div className="flex flex-col mt-4">
        <FollowNotification />
        <LikePostNotification />
        <CommentNotification />
      </div>
    </div>
  );
};

Notifications.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Notifications;
