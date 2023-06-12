import { Post } from '@/lib/interfaces';
import mongoose, { Schema, Model, model } from 'mongoose';

const PostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true },
    caption: { type: String, required: false },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Likes' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
  },
  {
    timestamps: true,
  }
);

const Post: Model<Post> = mongoose.models.Post || model('Post', PostSchema);
export default Post;
