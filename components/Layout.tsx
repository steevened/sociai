import React from 'react';
import Avatar from './Avatar';
import Card from './Card';
import NavigationCard from './NavigationCard';
import PostCard from './PostCard';
import PostFormCard from './PostFormCard';

export default function Layout() {
  return (
    <div className="md:flex mt-4 max-w-4xl mx-auto gap-6 mb-24 md:mb-0 ">
      <div className="w-3/12">
        <NavigationCard />
      </div>
      <div className="w-9/12">
        <PostFormCard />

        {/* posts */}
        <PostCard />
      </div>
    </div>
  );
}
