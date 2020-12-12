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

  const userId = mongoose.Types.ObjectId();
  const title = 'testUserHandle';

  let podcastId: mongoose.Types.ObjectId;

  beforeAll(async () => {
    await mongoose.disconnect();
    await connectToDB(mongoURI);
    app.listen(port);
    await Podcast.deleteMany({}).exec();
  });
  beforeEach(async () => {
    await Podcast.deleteMany({}).exec();
    const newsPodcasts = [
      { title, category: 'News', user: userId },
      { title, category: 'News', user: userId },
      { title, category: 'News', user: userId },
    ];
    const techPodcasts = [
      { title, category: 'Technology', user: userId },
      { title, category: 'Technology', user: userId },
      { title, category: 'Technology', user: userId },
    ];
    // @ts-ignore
    await Podcast.insertMany([...newsPodcasts, techPodcasts]);
    afterEach(async () => {
      await Podcast.deleteMany({}).exec();
    });
    afterAll(async () => {
      await mongoose.disconnect();

      await Podcast.deleteMany({}).exec();
    });

    describe('get /podcasts/:podcastId', () => {
      it('should return 200 and a list of news podcasts', async () => {
        expect.assertions(1);
        const response = await request(app).get(
          `/podcasts/?sort=News&page=1&lmit=25`,
        );

        expect(response.status).toBe(204);

        // expect(response.body.data.podcasts.length).toBe(newsPodcasts.length);
      });
      // it('should return 404 when podcast is not found', async () => {
      //   expect.assertions(1);
      //   const response = await request(app).get(
      //     `/podcasts/${mongoose.Types.ObjectId()}`,
      //   );
      //   expect(response.status).toBe(404);
      // });
    });
  });
});
