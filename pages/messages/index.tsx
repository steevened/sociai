import React from 'react';
import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import Layout from '@/components/Layout';
import TopBar from '../../components/atoms/TopBar';

const Messages: NextPageWithLayout = () => {
  return (
    <div>
      <TopBar title="Messages" />
    </div>
  );
};

Messages.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Messages;
