import { Request, Response, NextFunction, response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import passErrorToNext from '@utilities/passErrorToNext';
import User from '@users/User';
import Podcast from '@podcasts/Podcast';
import uploadToCloudinary from '@utilities/uploadToCloudinary';
import deleteFile from '@utilities/deleteFile';
import { getPodcastById } from '@podcasts/services';
import deleteCloudinaryFile from '@utilities/deleteFromCloudinary';
import isAuthorized from '@utilities/isAuthorized';
import findDocs from '@src/utilities/findDocs';
import PodcastType from '@customTypes/Podcast';
import getPaginationURLs from '@src/utilities/getPaginationURLs';

export const postPodcast = async (
  { userId, body: { title, website, category }, file }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const podcast = new Podcast({
      title,
      user: userId,
      category,
    });
    if (file) {
      const { path, filename } = file;
      podcast.cover = filename;
      uploadToCloudinary(path, filename);
      deleteFile(path);
    }
    await podcast.save();
    res.status(201).json({ data: { podcastId: podcast._id } });
  } catch (err) {
    console.log(err);
    passErrorToNext(err, next);
  }
};
export const patchPodcast = async (
  { userId, body: { title, website }, params: { podcastId }, file }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const podcast = await getPodcastById(podcastId);
    isAuthorized(podcast.user.toString(), userId);

    podcast.title = title;
    podcast.website = website;
    if (podcast.cover && file) {
      const { path, filename } = file;
      await deleteCloudinaryFile(podcast.cover);
      podcast.cover = filename;
      uploadToCloudinary(path, filename);
      deleteFile(path);
    }
    await podcast.save();
    res.sendStatus(204);
  } catch (err) {
    passErrorToNext(err, next);
  }
};
export const deletePodcast = async (
  { userId, params: { podcastId } }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const podcast = await getPodcastById(podcastId);
    isAuthorized(podcast.user.toString(), userId);
    podcast.remove();
    res.sendStatus(204);
  } catch (err) {
    passErrorToNext(err, next);
  }
};
export const getPodcast = async (
  { params: { podcastId } }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const podcast = await (await getPodcastById(podcastId))
      .populate([{ path: 'user', select: 'username' }])
      .execPopulate();

    res.status(200).json({ data: { podcast } });
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const getPodcasts = async (
  { pagination }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { page, limit, sort } = pagination;
    console.log(page, limit, sort);
    // const { documents, count } = await findDocs<PodcastType>({
    //   model: Podcast,
    //   pagination,
    //   query: { category: sort },
    // });
    // const { prevPage, nextPage } = getPaginationURLs({
    //   page,
    //   urlExtension: 'podcasts',
    //   count,
    //   queries: {
    //     limit,
    //     sort,
    //   },
    // });

    // res.status(200).json({
    //   data: {
    //     podcasts: documents,
    //     links: {
    //       next: nextPage,
    //       prev: prevPage,
    //     },
    //   },
    // });
    res.sendStatus(204);
  } catch (err) {
    passErrorToNext(err, next);
  }
};
