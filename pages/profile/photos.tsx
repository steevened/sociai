import React from 'react';
import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Image from 'next/image';

interface Image {
  id: number;
  src: string;
  alt: string;
}

const images: Image[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1616797147704-7df2e256d397?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=384&q=80',
    alt: 'photo',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1599009868447-13994ed30063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    alt: 'photo',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1583993170548-e8bdb2f5a0b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    alt: 'photo',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1604948099281-76c3cf809be9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    alt: 'photo',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1603712152216-99c759c6500c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBvcnRyYWl0JTIwZmlsbSUyMHlvdW5nJTIwYm95fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    alt: 'photo',
  },
];

const Photos: NextPageWithLayout = () => {
  return (
    <Card>
      <h2 className="text-3xl">Photos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5  justify-items-center mt-5">
        {images.map((image) => (
          <div
            key={image.id}
            className="min-w-[160px] h-[160px]  w-full overflow-hidden flex items-center justify-center rounded-md shadow-md"
          >
            <Image
              className="scale-150"
              src={image.src}
              alt={image.alt}
              width={160}
              height={160}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

Photos.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Photos;
