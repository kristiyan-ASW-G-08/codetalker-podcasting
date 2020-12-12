import mongoose, { Schema } from 'mongoose';
import Episode from '@customTypes/Episode';
import duplicationErrorHandler from '@customMiddleware/duplicationErrorHandler';
import uniqueValidator from 'mongoose-unique-validator';

const EpisodeSchema: Schema = new Schema({
  title: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 200,
  },
  description: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 1000,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  podcast: {
    type: Schema.Types.ObjectId,
    ref: 'Podcast',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

EpisodeSchema.index({ title: 'text' });

EpisodeSchema.plugin(uniqueValidator);
// @ts-ignore
EpisodeSchema.post('save', duplicationErrorHandler);
// @ts-ignore
EpisodeSchema.post('update', duplicationErrorHandler);

export default mongoose.model<Episode>('Episode', EpisodeSchema);
