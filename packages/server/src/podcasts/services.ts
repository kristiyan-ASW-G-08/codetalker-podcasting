import Podcast from 'src/podcasts/Podcast';
import PodcastType from '@customTypes/Podcast';
import getResource from '@utilities/getResource';

export const getPodcastById = async (podcastId: string): Promise<PodcastType> =>
  getResource<PodcastType>(Podcast, { name: '_id', value: podcastId });

export default getPodcastById;
