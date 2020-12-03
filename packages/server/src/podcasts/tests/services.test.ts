import { getPodcastById } from '@podcasts/services';
import Podcast from '@podcasts/Podcast';
import getResource from '@utilities/getResource';

jest.mock('@utilities/getResource');

const getResourceMock = getResource as jest.MockedFunction<typeof getResource>;
describe('getPOdcastById', () => {
  it(`should call getResource`, async () => {
    expect.assertions(2);
    const podcastId = 'podcastId';
    await getPodcastById(podcastId);

    expect(getResource).toHaveBeenCalledTimes(1);
    expect(getResourceMock).toHaveBeenCalledWith(Podcast, {
      name: '_id',
      value: podcastId,
    });
  });
});
