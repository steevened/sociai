import { IComments } from '@/lib/interfaces';
import mongoose, { Model, Schema, model } from 'mongoose';

const CommentsSchema = new Schema(
  {
    user: { type: String },
    post: { type: String },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const Comments: Model<IComments> =
  mongoose.models.Comments || model('Comments', CommentsSchema);

export default Comments;
