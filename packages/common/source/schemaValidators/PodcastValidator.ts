import * as yup from 'yup';
import { title, website } from './fields';

const PodcastValidator = yup.object().shape({
  title,
  website,
});

export default PodcastValidator;
