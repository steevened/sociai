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
      <div className="p-1 pb-20 md:pb-1">
        <ImgsGrid posts={posts} />
      </div>
    </div>
  );
};

Saved.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Saved;
