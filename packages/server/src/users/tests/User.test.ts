import mongoose from 'mongoose';
import User from 'src/users/User';
import UserType from '@customTypes/User';
import connectToDB from '@utilities/connectToDB';
import duplicationErrorHandler from '@customMiddleware/duplicationErrorHandler';

jest.mock('@customMiddleware/duplicationErrorHandler');

const duplicationErrorHandlerMock = duplicationErrorHandler as jest.MockedFunction<
  typeof duplicationErrorHandler
>;

describe('User', (): void => {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env;
  const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-zmcyw.mongodb.net/${MONGO_DATABASE}?retryWrites=true`;
  const username = 'username';
  const email = 'testEmail@mail.com';
  const password = 'testPassword';
  beforeAll(
    async (): Promise<void> => {
      await connectToDB(mongoURI);
      await User.remove({}).exec();
    },
  );
  afterEach(
    async (): Promise<void> => {
      await User.remove({}).exec();
    },
  );
  afterAll(
    async (): Promise<void> => {
      await mongoose.disconnect();
    },
  );
  it('should throw an error when validation is not passed', async () => {
    expect.assertions(3);
    const userObj = {
      username,
      email,
      password,
    };
    // @ts-ignore
    await User.insertMany([userObj]);
    const user = new User(userObj);
    await expect(user.save()).rejects.toThrowError();
    expect(duplicationErrorHandlerMock).toHaveBeenCalledTimes(0);
    expect(user.validate).toThrowError();
  });
  it('should create a new user when validation is successful', async (): Promise<
    void
  > => {
    expect.assertions(8);
    const user: UserType = new User({
      username,
      email,
      password,
    });
    await expect(user.save()).resolves.not.toThrowError();
    expect(duplicationErrorHandlerMock).toHaveBeenCalledTimes(1);
    expect(user).toMatchObject({
      username,
      email,
      password,
    });
    expect(user.username).toBe(username);

    expect(user.email).toBe(email);
    expect(user.password).toBe(password);
    expect(user.date).toBeDefined();
    expect(user._id).toBeDefined();
  });
});
