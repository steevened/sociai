import { IUser } from '@/lib/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose';

const userSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: URL, required: false },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;
