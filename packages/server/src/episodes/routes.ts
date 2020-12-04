import express from 'express';
import multer from 'multer';
import validationHandler from '@customMiddleware/validationHandler';
import { deleteEpisode, postEpisode } from '@episodes/controllers';
import authenticationHandler from '@customMiddleware/authenticationHandler';
import validators from '@cdtr/common/source/schemaValidators/validators';
import { getPodcast } from '@src/podcasts/controllers';

const router = express.Router();

router.post(
  '/podcasts/:podcastId/episodes',
  authenticationHandler,
  validationHandler([{ schema: validators.EpisodeValidator, target: 'body' }]),
  postEpisode,
);

router.delete('/episodes/:episodeId', authenticationHandler, deleteEpisode);

router.get('/episodes/:episodeId', getPodcast);
