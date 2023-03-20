import React from 'react';
import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import Layout from '@/components/Layout';

const Messages: NextPageWithLayout = () => {
  return <div>Messages</div>;
};

Messages.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Messages;
