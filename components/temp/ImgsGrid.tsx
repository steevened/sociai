import React, { FC } from 'react';
import SavedImg from '../saved/SavedImg';
import { IPost } from '@/lib/interfaces';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  posts: IPost[];
}

const ImgsGrid: FC<Props> = ({ className, posts }) => {
  return (
    <div className={`grid grid-cols-3 gap-1 ${className}`}>
      {posts.map((post) => (
        <SavedImg
          key={post._id}
          comments={post.comments.length}
          image={post.image}
          likes={post.likes.length}
        />
      ))}
    </div>
  );
};

export default ImgsGrid;
