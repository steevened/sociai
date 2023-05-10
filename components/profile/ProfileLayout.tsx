import React from 'react';
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
