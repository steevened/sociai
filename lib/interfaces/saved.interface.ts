import { ILikes } from './likes.interface';

export interface ISaved {
  _id: String;
  likes: ILikes[];
  userId: String;
  createdAt: Date;
  updatedAt: Date;
}

// Generated by https://quicktype.io

export interface SavedResponse {
  saved: Saved[];
}

export interface Saved {
  _id: string;
  post: Post;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Post {
  _id: string;
  user: string;
  image: string;
  caption: string;
  likes: string[];
  comments: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
