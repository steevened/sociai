import { IUser } from './user.interface';

export interface IPost {
  _id: string;
  // userId: string;
  user: IUser;
  image: string;
  caption: string;
  likes: string[];
  comments: string[];
  cratedAt: Date;
  updatedAt: Date;
}
