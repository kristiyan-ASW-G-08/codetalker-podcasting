import mongoose from 'mongoose';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import app from 'src/app';
import User from '@users/User';
import Podcast from '@podcasts/Podcast';
import connectToDB from '@utilities/connectToDB';
import PodcastType from '@customTypes/Podcast';
import uploadToCloudinary from '@utilities/uploadToCloudinary';
import deleteFromCloudinary from '@utilities/deleteFromCloudinary';

jest.mock('@utilities/uploadToCloudinary');

jest.mock('@utilities/deleteFromCloudinary');

const port = process.env.PORT || 8080;

describe('podcastRoutes', () => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-zmcyw.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;

  const userId = mongoose.Types.ObjectId().toString();
  const title = 'testUserHandle';
  const newTitle = 'newTitle';
  let podcast: PodcastType;
  let podcastId: mongoose.Types.ObjectId;

  beforeAll(async () => {
    await mongoose.disconnect();
    await connectToDB(mongoURI);
    app.listen(port);
    // @ts-ignore
    await User.deleteMany({}).exec();
    // @ts-ignore
    await Podcast.deleteMany({}).exec();
  });
  beforeEach(async () => {
    // @ts-ignore
    await User.deleteMany({}).exec();
    // @ts-ignore
    await Podcast.deleteMany({}).exec();
    podcast = await new Podcast({
      title,
      category: 'News',
      user: userId,
    });
    await podcast.save();
    podcastId = podcast._id;
  });
  afterEach(async () => {
    // @ts-ignore
    await User.deleteMany({}).exec();
    // @ts-ignore
    await Podcast.deleteMany({}).exec();
  });
  afterAll(async () => {
    await mongoose.disconnect();
    // @ts-ignore
    await User.deleteMany({}).exec();
    // @ts-ignore
    await Podcast.deleteMany({}).exec();
  });

  describe('get /podcasts/', () => {
    it('should return 200 and a podcast', async () => {
      expect.assertions(2);
      const response = await request(app).get(`/podcasts/${podcastId}`);

      expect(response.status).toBe(200);
      console.log(response.body.data);
      expect(response.body.data.podcast._id).toMatch(podcastId.toString());
    });
    it('should return 404 when podcast is not found', async () => {
      expect.assertions(1);
      const response = await request(app).get(
        `/podcasts/${mongoose.Types.ObjectId()}`,
      );
      expect(response.status).toBe(404);
    });
  });
});
