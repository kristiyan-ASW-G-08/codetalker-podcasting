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
  const secret = process.env.SECRET;
  const userId = mongoose.Types.ObjectId();
  const podcastId = mongoose.Types.ObjectId();
  const token = jwt.sign(
    {
      userId,
    },
    secret,
    { expiresIn: '1h' },
  );
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

  it('should return status 204 when the episode is deleted successfully', async () => {
    expect.assertions(1);
    const response = await request(app)
      .delete(`/episodes/${episodeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
  it(`should return 404:Not Found when episode doesn't exist`, async () => {
    expect.assertions(1);
    const response = await request(app)
      .delete(`/episodes/${mongoose.Types.ObjectId()}`)
      .send({ title, description });
    expect(response.status).toBe(401);
  });
  it(`should return 401:Unauthorized when the bearer token doesn't exist`, async () => {
    expect.assertions(1);
    const response = await request(app)
      .delete(`/episodes/${episodeId}`)
      .send({ title, description });
    expect(response.status).toBe(401);
  });
  it(`should return 401:Unauthorized when the bearer token userId and the episode userId don't match`, async () => {
    expect.assertions(1);
    const unauthorizedToken = jwt.sign(
      {
        userId: mongoose.Types.ObjectId,
      },
      secret,
      { expiresIn: '1h' },
    );
    const response = await request(app)
      .delete(`/episodes/${episodeId}`)
      .send({ title, description })
      .set('Authorization', `Bearer ${unauthorizedToken}`);
    expect(response.status).toBe(401);
  });
  it(`should return 401:Unauthorized when the bearer token is not valid`, async () => {
    expect.assertions(1);
    const response = await request(app)
      .delete(`/episodes/${episodeId}`)
      .send({ title, description })
      .set('Authorization', `Bearer ${'asdasdadsadasdasdads'}`);
    expect(response.status).toBe(401);
  });
});
