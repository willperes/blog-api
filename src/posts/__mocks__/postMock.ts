import { Post } from '../entities/post.entity';

const MOCKED_CREATED_DATE = 1701432000000;
const MOCKED_UPDATED_DATE = MOCKED_CREATED_DATE + 100_000_000;

const post: Post = {
  id: 1,
  author: 'Willian Peres',
  text: 'This is a post text',
  created_at: new Date(MOCKED_CREATED_DATE).toISOString(),
  updated_at: new Date(MOCKED_CREATED_DATE).toISOString(),
};

export const postMock = {
  MOCKED_CREATED_DATE,
  MOCKED_UPDATED_DATE,
  post,
};
