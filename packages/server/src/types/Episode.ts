import mongoose, { Document } from 'mongoose';
import CommonEpisode from '@cdtr/common/source/types/Episode';

export default interface Episode extends Document, CommonEpisode {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  podcast: mongoose.Types.ObjectId;
}
