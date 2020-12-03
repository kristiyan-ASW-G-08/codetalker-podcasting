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
  const secret = process.env.SECRET;
  const userId = mongoose.Types.ObjectId().toString();
  const token = jwt.sign(
    {
      userId,
    },
    secret,
    { expiresIn: '1h' },
  );
  const website = 'username';
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

  describe('patch /podcasts/:podcastId', () => {
    it('should return 204 status when the podcast is patched', async () => {
      expect.assertions(1);
      const response = await request(app)
        .patch(`/podcasts/${podcastId}`)
        .send({
          title: newTitle,
        })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });
    it('should return 404:Not Found status when the podcast is not found', async () => {
      expect.assertions(1);
      const response = await request(app)
        .patch(`/podcasts/${mongoose.Types.ObjectId()}`)
        .send({
          title: newTitle,
        })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
    it('should return 400:Bad Request  when the request has wrong format', async () => {
      expect.assertions(1);

      const response = await request(app)
        .patch(`/podcasts/${podcastId}`)
        .send({})
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
    });
    it('should return 401:Unauthorized Request  when there is not token', async () => {
      expect.assertions(1);

      const response = await request(app)
        .patch(`/podcasts/${podcastId}`)
        .send({ title: newTitle });

      expect(response.status).toBe(401);
    });
    it(`should return 401:Unauthorized when the bearer token is incorrect`, async () => {
      expect.assertions(1);

      const response = await request(app)
        .patch(`/podcasts/${podcastId}`)
        .send({ title: newTitle })
        .set('Authorization', `Bearer dsfsdfsdf`);

      expect(response.status).toBe(401);
    });
    it(`should return 401:Unauthorized when the bearer token doesn't exist`, async () => {
      expect.assertions(1);
      const response = await request(app)
        .patch(`/podcasts/${podcastId}`)
        .send({ title: newTitle });

      expect(response.status).toBe(401);
    });
    it('should return 401:Unauthorized Request  when the token contains the id of unauthorize user', async () => {
      const wrongUserToken = jwt.sign(
        {
          userId: mongoose.Types.ObjectId().toString(),
        },
        secret,
        { expiresIn: '1h' },
      );

      expect.assertions(1);
      expect.assertions(1);
      const response = await request(app)
        .patch(`/podcasts/${podcastId}`)
        .send({ title: newTitle })
        .set('Authorization', `Bearer ${wrongUserToken}`);

      expect(response.status).toBe(401);
    });
  });
});
