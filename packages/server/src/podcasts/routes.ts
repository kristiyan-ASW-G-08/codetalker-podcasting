import express from 'express';
import multer from 'multer';
import validationHandler from '@src/middleware/validationHandler';
import validators from '@cdtr/common/source/schemaValidators/validators';
import {
  postPodcast,
  patchPodcast,
  deletePodcast,
  getPodcast,
} from '@podcasts/controllers';
import authenticationHandler from '@src/middleware/authenticationHandler';

const router = express.Router();

router.post(
  '/podcasts',
  authenticationHandler,
  validationHandler([{ schema: validators.PodcastValidator, target: 'body' }]),
  postPodcast,
);

router.patch(
  '/podcasts/:podcastId',
  authenticationHandler,
  validationHandler([{ schema: validators.PodcastValidator, target: 'body' }]),
  patchPodcast,
);

router.delete('/podcasts/:podcastId', authenticationHandler, deletePodcast);

router.get('/podcasts/:podcastId', getPodcast);

export default router;
