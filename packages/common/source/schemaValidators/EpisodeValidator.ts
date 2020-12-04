import * as yup from 'yup';
import { title, description } from './fields';

const EpisodeValidator = yup.object().shape({
  title,
  description,
});

export default EpisodeValidator;
