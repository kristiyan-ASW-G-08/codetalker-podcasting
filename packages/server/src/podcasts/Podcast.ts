import mongoose, { Schema } from 'mongoose';
import Podcast from '@customTypes/Podcast';
import duplicationErrorHandler from '@customMiddleware/duplicationErrorHandler';
import uniqueValidator from 'mongoose-unique-validator';
import categories from '@cdtr/common/source/misc/categories';

const PodcastSchema: Schema = new Schema({
  title: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 50,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  website: { required: false, type: String, minlength: 3 },
  category: { required: true, type: String, enum: categories },
  cover: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

PodcastSchema.plugin(uniqueValidator);
// @ts-ignore
PodcastSchema.post('save', duplicationErrorHandler);
// @ts-ignore

export default mongoose.model<Podcast>('Podcast', PodcastSchema);
