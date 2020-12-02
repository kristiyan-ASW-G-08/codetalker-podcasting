import mongoose from 'mongoose';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import app from 'src/app';
import User from 'src/users/User';
import connectToDB from '@utilities/connectToDB';
import UserType from '@customTypes/User';

const port = process.env.PORT || 8080;

describe('userRoutes', () => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-zmcyw.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  beforeAll(async () => {
    await mongoose.disconnect();
    await connectToDB(mongoURI);
    app.listen(port);
    await User.remove({}).exec();
  });
  afterEach(async () => {
    await User.remove({}).exec();
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  const username = 'username';
  const handle = 'testUserHandle';
  const email = 'testmail@mail.com';
  const password = 'testPassword';
  const invalidEmail = 'testmail';
  const invalidPassword = '1234';
  const text =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vel alias, amet corporis modi corrupti.';
  const secret = process.env.SECRET;
  describe('/users', () => {
    it('should create a new user', async () => {
      expect.assertions(1);
      const response = await request(app)
        .post('/users')
        .send({
          username,
          handle,
          email,
          password,
          confirmPassword: password,
        });
      expect(response.status).toBe(201);
    });
    it("should throw an error with a status of 400: BadRequest when the req body doesn't pass validation", async (): Promise<
      void
    > => {
      expect.assertions(2);
      const response = await request(app)
        .post('/users')
        .send({
          username,
          handle,
          email: invalidEmail,
          password: invalidPassword,
          confirmPassword: password,
        });
      expect(response.status).toBe(400);
      expect(response.body).toMatchSnapshot();
    });
    it("should throw an error with a status of 400: BadRequest when the req body doesn't pass validation", async (): Promise<
      void
    > => {
      expect.assertions(2);
      const response = await request(app).post('/users');
      expect(response.status).toBe(400);
      expect(response.body).toMatchSnapshot();
    });
    it('should throw an error with a status of 409: Conflict when the user credentials are already taken', async (): Promise<
      void
    > => {
      expect.assertions(2);
      // @ts-ignore
      await User.insertMany({ username, handle, email, password });
      const response = await request(app)
        .post('/users')
        .send({
          username,
          handle,
          email,
          password,
          confirmPassword: password,
        });
      expect(response.status).toBe(409);
    });
  });
  describe.only('post /users/user/tokens', () => {
    it('should get a authentication token and user data object', async (): Promise<
      void
    > => {
      expect.assertions(4);
      const hashedPassword = await bcrypt.hash(password, 12);
      await User.insertMany({
        // @ts-ignore
        username,
        email,
        password: hashedPassword,
        isConfirmed: true,
      });
      const response = await request(app)
        .post('/users/user/tokens')
        .send({
          email,
          password,
        });
      const { token, user } = response.body.data;
      expect(response.status).toBe(200);
      expect(typeof token).toMatch('string');
      expect(user.username).toMatch(username);
      expect(user.email).toMatch(email);
    });
    it("should throw an error with a status of 400: BadRequest when the req body doesn't pass validation", async (): Promise<
      void
    > => {
      expect.assertions(2);
      const response = await request(app).post('/users/user/tokens');
      expect(response.status).toBe(400);
      expect(response.body).toMatchSnapshot();
    });
    it("should throw an error with a status of 404: NotFound when the user doesn't exist", async (): Promise<
      void
    > => {
      expect.assertions(1);
      const response = await request(app)
        .post('/users/user/tokens')
        .send({
          email,
          password,
        });
      expect(response.status).toBe(404);
    });
  });
});
