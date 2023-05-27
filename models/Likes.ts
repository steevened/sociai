import { ILikes } from '@/lib/interfaces';
import mongoose, { Schema, Model, model } from 'mongoose';

const LikeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  {
    timestamps: false,
  }
);

const Likes: Model<ILikes> =
  mongoose.models.Likes || model('Likes', LikeSchema);

export default Likes;
