import { getEpisodeById } from '@episodes/services';
import Episode from '@episodes/Episode';
import getResource from '@utilities/getResource';

jest.mock('@utilities/getResource');

const getResourceMock = getResource as jest.MockedFunction<typeof getResource>;
describe('getEpisodeId', () => {
  it(`should call getResource`, async () => {
    expect.assertions(2);
    const episodesId = 'episodesId';
    await getEpisodeById(episodesId);

    expect(getResource).toHaveBeenCalledTimes(1);
    expect(getResourceMock).toHaveBeenCalledWith(Episode, {
      name: '_id',
      value: episodesId,
    });
  });
});
