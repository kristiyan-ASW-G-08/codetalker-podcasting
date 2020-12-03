import mongoose from 'mongoose';
import Podcast from '@podcasts/Podcast';
import PodcastType from '@customTypes/Podcast';
import connectToDB from '@utilities/connectToDB';
import duplicationErrorHandler from '@customMiddleware/duplicationErrorHandler';

jest.mock('@customMiddleware/duplicationErrorHandler');

const duplicationErrorHandlerMock = duplicationErrorHandler as jest.MockedFunction<
  typeof duplicationErrorHandler
>;

describe('User', (): void => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-zmcyw.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  const title = 'username';
  const website = 'www.someadress.com';
  const cover = 'someimageAddress';
  const userId = mongoose.Types.ObjectId();
  beforeAll(
    async (): Promise<void> => {
      await connectToDB(mongoURI);
      await Podcast.remove({}).exec();
    },
  );
  afterEach(
    async (): Promise<void> => {
      await Podcast.remove({}).exec();
    },
  );
  afterAll(
    async (): Promise<void> => {
      await mongoose.disconnect();
    },
  );
  it('should throw an error when validation is not passed', async () => {
    expect.assertions(3);
    const podcastObj = {
      title,
      cover,
      website,
      user: userId,
    };
    // @ts-ignore
    await Podcast.insertMany([podcastObj]);
    const podcast = new Podcast(podcastObj);
    await expect(podcast.save()).rejects.toThrowError();
    expect(duplicationErrorHandlerMock).toHaveBeenCalledTimes(0);
    expect(podcast.validate).toThrowError();
  });
  it('should create a new podcast when validation is successful', async (): Promise<
    void
  > => {
    expect.assertions(8);
    const podcast: PodcastType = new Podcast({
      title,
      cover,
      website,
      user: userId,
    });
    await expect(podcast.save()).resolves.not.toThrowError();
    expect(duplicationErrorHandlerMock).toHaveBeenCalledTimes(1);
    expect(podcast).toMatchObject({
      title,
      cover,
      website,
    });
    expect(podcast.title).toBe(title);
    expect(podcast.cover).toBe(cover);
    expect(podcast.user).toBe(userId);
    expect(podcast.date).toBeDefined();
    expect(podcast._id).toBeDefined();
  });
});
