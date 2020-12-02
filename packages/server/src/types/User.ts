import mongoose, { Document } from 'mongoose';
import CommonUser from '@cdtr/common/source/types/User';

export default interface User extends Document, CommonUser {
  password: string;
  _id: mongoose.Types.ObjectId;
}
