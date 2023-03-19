import React from 'react';
import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import Layout from '@/components/Layout';

const About: NextPageWithLayout = () => {
  return <div>about</div>;
};

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default About;
