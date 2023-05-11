import { IUser } from '@/lib/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;
