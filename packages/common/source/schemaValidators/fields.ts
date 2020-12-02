import * as yup from 'yup';

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
