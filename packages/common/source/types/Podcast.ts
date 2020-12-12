type Category =
  | 'Technology'
  | 'Sports'
  | 'News'
  | 'Entertainment'
  | 'Comedy'
  | 'Business'
  | 'Health';

export default interface Podcast {
  title: string;
  website: string | undefined;
  date: string;
  cover: string;
  category: Category;
}

