import { Schema, model } from 'mongoose';
import { IUser } from '../types/user';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    url: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>('User', userSchema);
