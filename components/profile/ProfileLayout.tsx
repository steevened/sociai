import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Avatar from '../Avatar';
import Card from '../atoms/Card';
import PostCard from '../PostCard';
import Profile from './Profile';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Profile />
      {children}
    </>
  );
};

export default ProfileLayout;
