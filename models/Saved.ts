import { ISaved } from '@/lib/interfaces/saved.interface';
import mongoose, { Schema, model, Model } from 'mongoose';

const SavedSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const Saved: Model<ISaved> =
  mongoose.models.Saved || model('Saved', SavedSchema);

export default Saved;
