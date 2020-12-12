import * as yup from 'yup';
import { sort, limit, page } from './fields';

const SortStringValidator = yup.object().shape({
  sort,
  limit,
  page,
});

export default SortStringValidator;
