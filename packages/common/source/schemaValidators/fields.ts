import * as yup from 'yup';
import categories from '../misc/categories';

export const username = yup
  .string()
  .trim()
  .min(1)
  .max(50)
  .required();
export const email = yup
  .string()
  .trim()
  .email()
  .required();
export const password = yup
  .string()
  .trim()
  .min(12)
  .required();
export const confirmPassword = yup
  .string()
  .trim()
  .min(12)
  .oneOf([yup.ref('password')], "Passwords don't match")
  .required();
export const title = yup
  .string()
  .min(1)
  .max(200)
  .required();
export const website = yup
  .string()
  .url()
  .notRequired();

export const description = yup
  .string()
  .min(10)
  .max(1000)
  .required();
export const sort = yup
  .string()
  .trim()
  .oneOf(categories);

export const limit = yup
  .number()
  .integer()
  .min(1)
  .max(50)
  .integer();
export const page = yup
  .number()
  .min(1)
  .integer();
