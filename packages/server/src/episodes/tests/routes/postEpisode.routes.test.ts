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

  const username = 'username';
  const email = 'testmail@mail.com';
  const password = 'testPassword';
  const website = 'username';
  const title = 'testUserHandle';
  const description = 'someDescription';
  const secret = process.env.SECRET;
  let testUser: UserType;
  let token: string;
  const podcastId = mongoose.Types.ObjectId();
  beforeAll(async () => {
    await mongoose.disconnect();
    await connectToDB(mongoURI);
    app.listen(port);

    await User.deleteMany({}).exec();
    await Episode.deleteMany({}).exec();
    await Podcast.deleteMany({}).exec();
  });
  beforeEach(async () => {
    await User.deleteMany({}).exec();
    await Episode.deleteMany({}).exec();
    await Podcast.deleteMany({}).exec();

    testUser = await new User({
      username,
      email,
      password,
    }).save();

    token = jwt.sign(
      {
        userId: testUser._id,
      },
      secret,
      { expiresIn: '1h' },
    );
  });
  afterEach(async () => {
    await User.deleteMany({}).exec();
    await Episode.deleteMany({}).exec();

    await Podcast.deleteMany({}).exec();
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await Episode.deleteMany({}).exec();
    await User.deleteMany({}).exec();

    await Podcast.deleteMany({}).exec();
  });

  it('should return status 201 when the episode is created successfully', async () => {
    expect.assertions(1);
    const response = await request(app)
      .post(`/podcasts/${podcastId}/episodes`)
      .send({
        title,
        description,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
  });
  // it('should return 400:BadRequest when the request has wrong forma', async () => {
  //   expect.assertions(1);
  //   const response = await request(app)
  //     .post(`/podcasts/${podcastId}/episodes`)
  //     .send({
  //       title,
  //     })
  //     .set('Authorization', `Bearer ${token}`);

  //   expect(response.status).toBe(400);
  // });
  // it('should return 400:BadRequest when the request has wrong forma', async () => {
  //   expect.assertions(1);
  //   const response = await request(app)
  //     .post('/podcasts')
  //     .send({ title });
  //   expect(response.status).toBe(401);
  // });
  // it(`should return 401:Unauthorized when the bearer token doesn't exist`, async () => {
  //   expect.assertions(1);
  //   const response = await request(app)
  //     .post(`/podcasts/${podcastId}/episodes`)
  //     .send({ title, description });
  //   expect(response.status).toBe(401);
  // });
  // it(`should return 401:Unauthorized when the bearer token is not valid`, async () => {
  //   expect.assertions(1);
  //   const response = await request(app)
  //     .post(`/podcasts/${podcastId}/episodes`)
  //     .send({ title, description })
  //     .set('Authorization', `Bearer ${'asdasdadsadasdasdads'}`);
  //   expect(response.status).toBe(401);
  // });
});
