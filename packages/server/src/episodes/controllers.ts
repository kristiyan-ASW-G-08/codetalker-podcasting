import { Request, Response, NextFunction, response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import passErrorToNext from '@utilities/passErrorToNext';
import User from '@users/User';
import Podcast from '@podcasts/Podcast';
import uploadToCloudinary from '@utilities/uploadToCloudinary';
import deleteFile from '@utilities/deleteFile';
import { getEpisodeById } from '@episodes/services';
import deleteCloudinaryFile from '@utilities/deleteFromCloudinary';
import isAuthorized from '@utilities/isAuthorized';
import Episode from '@episodes/Episode';

export const postEpisode = async (
  {
    userId,
    body: { title, description },
    params: { episodeId },
    file,
  }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const episode = new Episode({
      title,
      description,
      episode: episodeId,
      user: userId,
    });
    await episode.save();
    res.status(201).json({ data: { episodeId: episode._id } });
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const deleteEpisode = async (
  { userId, params: { episodeId } }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const episode = await getEpisodeById(episodeId);
    isAuthorized(episode.user.toString(), userId);
    episode.remove();
    res.sendStatus(204);
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const getEpisode = async (
  { params: { episodeId } }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res
      .status(200)
      .json({ data: { episode: await getEpisodeById(episodeId) } });
  } catch (err) {
    passErrorToNext(err, next);
  }
};
export default {};
