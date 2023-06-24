// import { IComments } from '@/lib/interfaces';
import { Comment } from '@/lib/interfaces';
import mongoose, { Model, Schema, model } from 'mongoose';

const CommentsSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const Comments: Model<Comment> =
  mongoose.models.Comments || model('Comments', CommentsSchema);

export default Comments;
