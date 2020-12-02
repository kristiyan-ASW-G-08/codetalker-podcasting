import mongoose, { Schema } from 'mongoose';
import User from '@customTypes/User';
import duplicationErrorHandler from '@customMiddleware/duplicationErrorHandler';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema: Schema = new Schema({
  username: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 50,
    unique: true,
  },
  email: { required: true, type: String, minlength: 3, unique: true },
  password: { required: true, type: String, minlength: 12 },
  website: { required: false, type: String, minlength: 3 },
  cover: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.index({ username: 'text' });

UserSchema.plugin(uniqueValidator);
// @ts-ignore
UserSchema.post('save', duplicationErrorHandler);
// @ts-ignore
UserSchema.post('update', duplicationErrorHandler);

export default mongoose.model<User>('User', UserSchema);
