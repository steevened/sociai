import { FC } from 'react';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout';

const CreatePage: NextPageWithLayout = ({}) => {
  return <div>index</div>;
};

CreatePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default CreatePage;
