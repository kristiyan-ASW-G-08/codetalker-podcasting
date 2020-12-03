import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import passErrorToNext from '@utilities/passErrorToNext';
import User from '@users/User';
import { errors, RESTError } from '@utilities/RESTError';
import { getUserByEmail } from '@users/services';

export const signUp = async (
  { body: { username, handle, email, password } }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { _id } = await new User({
      username,
      handle,
      email,
      password: await bcrypt.hash(password, 12),
    }).save();
    res.sendStatus(201);
  } catch (err) {
    passErrorToNext(err, next);
  }
};

export const logIn = async (
  { body: { email, password } }: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { SECRET } = process.env;
    const user = await getUserByEmail(email);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      const { status, message } = errors.Unauthorized;
      throw new RESTError(status, message, [
        {
          path: 'password',
          message: 'Wrong password. Try again',
        },
      ]);
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      SECRET,
      { expiresIn: '1h' },
    );
    const { username, date, _id } = user;
    res.status(200).json({
      data: {
        token,
        user: {
          username,
          email,
          date,
          _id,
        },
      },
    });
  } catch (err) {
    console.log(err);
    passErrorToNext(err, next);
  }
};
