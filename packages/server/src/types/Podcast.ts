import mongoose, { Document } from 'mongoose';
import CommonPodcast from '@cdtr/common/source/types/Podcast';

export default interface Podcast extends Document, CommonPodcast {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}
