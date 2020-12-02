import * as yup from 'yup';
import {
  username,
  email,
  password,
  confirmPassword,
} from './fields';

const UserLoginValidator = yup.object().shape({
  username,
  email,
  password,
  confirmPassword,
});

export default UserLoginValidator;
