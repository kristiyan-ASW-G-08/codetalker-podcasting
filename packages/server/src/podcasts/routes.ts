import express from 'express';
import multer from 'multer';
import validationHandler from '@customMiddleware/validationHandler';
import validators from '@cdtr/common/source/schemaValidators/validators';
import {
  postPodcast,
  patchPodcast,
  deletePodcast,
  getPodcast,
  getPodcasts,
} from '@podcasts/controllers';
import authenticationHandler from '@customMiddleware/authenticationHandler';
import paginationHandler from '@src/middleware/paginationHandler';

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

router.get('/podcasts', paginationHandler, getPodcasts);

export default router;
