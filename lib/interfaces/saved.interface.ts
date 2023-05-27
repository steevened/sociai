import { ILikes } from './likes.interface';

export interface ISaved {
  _id: String;
  likes: ILikes[];
  userId: String;
  createdAt: Date;
  updatedAt: Date;
}
