import React from 'react';
import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import Layout from '../../components/Layout';

const Saved: NextPageWithLayout = () => {
  return (
    <div className="">
      <h2 className="text-3xl font-normal">All</h2>
    </div>
  );
};

Saved.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Saved;
