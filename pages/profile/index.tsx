import { NextPageWithLayout } from './../_app';
import { ReactElement } from 'react';
import Layout from '../../components/Layout';
import PostCard from '../../components/PostCard';
const Profile: NextPageWithLayout = () => {
  return <PostCard />;
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
