import { ILikes } from './likes.interface';
import { IUser } from './user.interface';

export interface IPost {
  _id: string;
  // userId: string;
  user: IUser;
  image: string;
  caption: string;
  likes: ILikes[];
  comments: string[];
  cratedAt: Date;
  updatedAt: Date;
}
