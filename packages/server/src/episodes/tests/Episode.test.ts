import mongoose from 'mongoose';
import Episode from '@episodes/Episode';
import EpisodeType from '@customTypes/Episode';
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
  const description = 'someDescription';
  const user = mongoose.Types.ObjectId();
  const podcast = mongoose.Types.ObjectId();
  beforeAll(
    async (): Promise<void> => {
      await connectToDB(mongoURI);
      await Episode.remove({}).exec();
    },
  );
  afterEach(
    async (): Promise<void> => {
      await Episode.remove({}).exec();
    },
  );
  afterAll(
    async (): Promise<void> => {
      await mongoose.disconnect();
    },
  );
  it('should throw an error when validation is not passed', async () => {
    expect.assertions(3);
    const episodeObj = {
      title,
      website,
      description,
      user,
      podcast,
    };
    // @ts-ignore
    await Episode.insertMany([episodeObj]);
    const episode = new Episode(episodeObj);
    await expect(episode.save()).rejects.toThrowError();
    expect(duplicationErrorHandlerMock).toHaveBeenCalledTimes(0);
    expect(episode.validate).toThrowError();
  });
  it('should create a new episode when validation is successful', async (): Promise<
    void
  > => {
    expect.assertions(9);
    const episode: EpisodeType = new Episode({
      title,
      description,
      website,
      user,
      podcast,
    });
    await expect(episode.save()).resolves.not.toThrowError();
    expect(duplicationErrorHandlerMock).toHaveBeenCalledTimes(1);
    expect(episode).toMatchObject({
      title,
      description,
      user,
      podcast,
    });
    expect(episode.title).toBe(title);
    expect(episode.description).toBe(description);
    expect(episode.user).toBe(user);
    expect(episode.podcast).toBe(podcast);
    expect(episode.date).toBeDefined();
    expect(episode._id).toBeDefined();
  });
});
