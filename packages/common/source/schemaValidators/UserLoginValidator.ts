import * as yup from 'yup';
import { email, password } from './fields';

const UserLoginValidator = yup.object().shape({
  email,
  password,
});

export default UserLoginValidator;
