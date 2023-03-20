import React from 'react';
import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/Card';

const About: NextPageWithLayout = () => {
  return (
    <Card>
      <h2 className="text-3xl">About me</h2>
      <p className="mt-2">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel
        voluptatibus fugit repellat minima suscipit voluptates commodi vitae
        modi nisi quo eius nostrum earum tempore dolores numquam sed nemo,
        exercitationem soluta?
      </p>
    </Card>
  );
};

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default About;
