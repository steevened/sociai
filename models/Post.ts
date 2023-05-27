import { IPost } from '@/lib/interfaces';
import mongoose, { Schema, Model, model } from 'mongoose';

const PostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true },
    caption: { type: String, required: false },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Likes' }],
    comments: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const Post: Model<IPost> = mongoose.models.Post || model('Post', PostSchema);
export default Post;
