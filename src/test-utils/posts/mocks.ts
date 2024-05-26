import { Post } from '../../posts/entities/post.entity';

const MOCKED_CREATED_DATE = 1701432000000;
const MOCKED_UPDATED_DATE = MOCKED_CREATED_DATE + 100_000_000;

const post: Post = {
  id: 1,
  title: 'Post Title',
  cover_image_url: 'https://foo.com/image.png',
  author: {
    image_url: 'https://github.com/willperes.png',
    name: 'Willian Peres',
  },
  text: 'This is a post text',
  created_at: new Date(MOCKED_CREATED_DATE).toISOString(),
  updated_at: new Date(MOCKED_CREATED_DATE).toISOString(),
};

export const postMocks = {
  MOCKED_CREATED_DATE,
  MOCKED_UPDATED_DATE,
  post,
};
