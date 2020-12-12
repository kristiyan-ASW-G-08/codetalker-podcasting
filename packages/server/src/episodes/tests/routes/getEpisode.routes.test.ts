import mongoose from 'mongoose';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import app from 'src/app';
import User from '@users/User';
import Podcast from '@podcasts/Podcast';
import Episode from '@episodes/Episode';
import connectToDB from '@utilities/connectToDB';
import UserType from '@customTypes/User';
import uploadToCloudinary from '@utilities/uploadToCloudinary';
import deleteFromCloudinary from '@utilities/deleteFromCloudinary';
import { isRegExp } from 'util';

jest.mock('@utilities/uploadToCloudinary');

jest.mock('@utilities/deleteFromCloudinary');

describe('episode routes', () => {
  const port = process.env.PORT || 8080;
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-zmcyw.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;

  const title = 'testUserHandle';
  const description = 'someDescription';
  const userId = mongoose.Types.ObjectId();
  const podcastId = mongoose.Types.ObjectId();
  let episodeId: string;
  beforeAll(async () => {
    await mongoose.disconnect();
    await connectToDB(mongoURI);
    app.listen(port);

    await Episode.deleteMany({}).exec();
  });
  beforeEach(async () => {
    await Episode.deleteMany({}).exec();

    const episode = await new Episode({
      title,
      description,
      podcast: podcastId,
      user: userId,
    }).save();
    episodeId = episode._id.toString();
  });
  afterEach(async () => {
    await Episode.deleteMany({}).exec();

    await Podcast.deleteMany({}).exec();
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await Episode.deleteMany({}).exec();

    await Podcast.deleteMany({}).exec();
  });

  it('should return status 200 and a episodes', async () => {
    expect.assertions(1);
    const response = await request(app).get(`/episodes/${episodeId}`);

    expect(response.status).toBe(200);
  });
  it(`should return 404:Not Found when episode doesn't exist`, async () => {
    expect.assertions(1);
    const response = await request(app).get(
      `/episodes/${mongoose.Types.ObjectId()}`,
    );
    expect(response.status).toBe(404);
  });
});
