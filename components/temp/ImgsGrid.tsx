import React from 'react';
import SavedImg from '../saved/SavedImg';

interface IPost {
  id: number;
  imgLink: string;
  likes: number;
  comments: number;
}

const posts: IPost[] = [
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

export default function ImgsGrid({ className }: { className?: string }) {
  return (
    <div className={`grid grid-cols-3 gap-1 ${className}`}>
      {posts.map((post) => (
        <SavedImg
          key={post.id}
          comments={post.comments}
          id={post.id}
          imgLink={post.imgLink}
          likes={post.likes}
        />
      ))}
    </div>
  );
}
