import mongoose from 'mongoose';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import app from 'src/app';
import User from '@users/User';
import Podcast from '@podcasts/Podcast';
import connectToDB from '@utilities/connectToDB';
import UserType from '@customTypes/User';
import uploadToCloudinary from '@utilities/uploadToCloudinary';
import deleteFromCloudinary from '@utilities/deleteFromCloudinary';

jest.mock('@utilities/uploadToCloudinary');

jest.mock('@utilities/deleteFromCloudinary');

describe('post /podcasts', () => {
  const port = process.env.PORT || 8080;
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-zmcyw.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  const username = 'username';
  const email = 'testmail@mail.com';
  const password = 'testPassword';
  const website = 'username';
  const title = 'testUserHandle';
  const secret = process.env.SECRET;
  let testUser: UserType;
  let token: string;
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
    testUser = new User({
      username,
      email,
      password,
    });
    await testUser.save();
    token = jwt.sign(
      {
        userId: testUser._id,
      },
      secret,
      { expiresIn: '1h' },
    );
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

  it('should return 201 status when the podcast is created successfully', async () => {
    expect.assertions(1);
    const response = await request(app)
      .post('/podcasts')
      .send({
        title,
        category: 'News',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
  });
  it('should return 400:BadRequest when the request has wrong format', async () => {
    expect.assertions(1);
    const response = await request(app)
      .post('/podcasts')
      .send({})
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
  it(`should return 401:Unauthorized when the bearer token doesn't exist`, async () => {
    expect.assertions(1);
    const response = await request(app)
      .post('/podcasts')
      .send({ title, category: 'News' });
    expect(response.status).toBe(401);
  });
  it(`should return 401:Unauthorized when the bearer token is not valid`, async () => {
    expect.assertions(1);
    const response = await request(app)
      .post('/podcasts')
      .send({ title, category: 'News' })
      .set('Authorization', `Bearer ${'asdasdadsadasdasdads'}`);
    expect(response.status).toBe(401);
  });
});
