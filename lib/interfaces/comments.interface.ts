export interface IComments {
  _id: string;
  user: string;
  post: string;
  comment: string;
  cratedAt: Date;
  updatedAt: Date;
}

// Generated by https://quicktype.io

export interface CommentsResponse {
  comments: Comment[];
}

export interface Comment {
  _id: string;
  user: User;
  post: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: null;
}
