import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import Layout from '../../components/Layout';
const Notifications: NextPageWithLayout = () => {
  return <div>notifications</div>;
};

Notifications.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Notifications;
