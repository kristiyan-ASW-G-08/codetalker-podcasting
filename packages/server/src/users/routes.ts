import express from 'express';
import multer from 'multer';
import validationHandler from '@src/middleware/validationHandler';
import validators from '@cdtr/common/source/schemaValidators/validators';
import { signUp, logIn } from '@users/controllers';

const router = express.Router();

router.post(
  '/users',
  validationHandler([
    { schema: validators.UserSignUpValidator, target: 'body' },
  ]),
  signUp,
);

router.post(
  '/users/user/tokens',
  validationHandler([
    { schema: validators.UserLoginValidator, target: 'body' },
  ]),
  logIn,
);

export default router;
