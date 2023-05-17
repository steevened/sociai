import { FC, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/Layout';
import Cropper from 'react-easy-crop';

const CreatePage: NextPageWithLayout = ({}) => {
  return (
    <div className="test">
      <div className="relative h-96 w-auto ">
        <div></div>
        <div className="mx-3 my-2"></div>
      </div>
    </div>
  );
};

CreatePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default CreatePage;
