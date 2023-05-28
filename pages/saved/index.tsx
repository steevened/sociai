import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { ReactElement } from 'react';
import Layout from '../../components/Layout';
import TopBar from '@/components/atoms/TopBar';
import SavedImg from '@/components/saved/SavedImg';
import ImgsGrid from '@/components/temp/ImgsGrid';
import { useSaved } from '@/lib/hooks';
import { IPost, Post } from '@/lib/interfaces';

export interface SavePost {
  id: number;
  imgLink: string;
  likes: number;
  comments: number;
}

const savedPosts: SavePost[] = [
  {
    id: 1,
    imgLink: 'https://picsum.photos/200/200',
    likes: 100,
    comments: 10,
  },
  {
    id: 2,
    imgLink: 'https://picsum.photos/200/200',
    likes: 100,
    comments: 10,
  },
  {
    id: 3,
    imgLink: 'https://picsum.photos/200/200',
    likes: 100,
    comments: 10,
  },
  {
    id: 4,
    imgLink: 'https://picsum.photos/200/200',
    likes: 100,
    comments: 10,
  },
  {
    id: 5,
    imgLink: 'https://picsum.photos/200/200',
    likes: 100,
    comments: 10,
  },
  {
    id: 6,
    imgLink: 'https://picsum.photos/200/200',
    likes: 100,
    comments: 10,
  },
  {
    id: 7,
    imgLink: 'https://picsum.photos/200/200',
    likes: 100,
    comments: 10,
  },
  {
    id: 8,
    imgLink: 'https://picsum.photos/200/200',
    likes: 100,
    comments: 10,
  },
  {
    id: 9,
    imgLink: 'https://picsum.photos/200/200',
    likes: 100,
    comments: 10,
  },
];

const Saved: NextPageWithLayout = () => {
  const { data: savedPosts, error, isLoading, mutate } = useSaved();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const saved = savedPosts?.map(({ post }) => post);
    if (!saved) return;
    setPosts(saved as any);
  }, [savedPosts]);

  // console.log(savedPosts);

  return (
    <div className="">
      <TopBar title="All Saved Posts" />
      <ImgsGrid className="mt-4" posts={posts} />
    </div>
  );
};

Saved.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Saved;
