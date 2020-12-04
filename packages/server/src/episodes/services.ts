import Episode from 'src/episodes/Episode';
import EpisodeType from '@customTypes/Episode';
import getResource from '@utilities/getResource';

export const getEpisodeById = async (episodeId: string): Promise<EpisodeType> =>
  getResource<EpisodeType>(Episode, { name: '_id', value: episodeId });

export default getEpisodeById;
