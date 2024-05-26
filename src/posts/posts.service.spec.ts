import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { PostsRepositoryImpl } from './posts.repository';
import { postMocks } from '../test-utils/posts/mocks';

describe('Integration: PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, PostsRepositoryImpl],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  function createPostUtil(): Promise<Post> {
    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => postMocks.MOCKED_CREATED_DATE);

    const postDTO: CreatePostInput = {
      author: postMocks.post.author,
      text: postMocks.post.text,
    };

    return service.create(postDTO);
  }

  test('Creating a new post', async () => {
    // 1) Create a new post
    const createdPost = await createPostUtil();
    expect(createdPost).toMatchObject(postMocks.post);

    // 2) Find the post to assert that the post was created
    const postQuery = await service.findOne(postMocks.post.id);
    expect(postQuery).toEqual(postMocks.post);
  });

  test('Updating a post', async () => {
    const updatedText = 'This is an updated post text';
    const postUpdateDTO: UpdatePostInput = {
      id: postMocks.post.id,
      text: updatedText,
    };

    // 1) Create the post
    await createPostUtil();

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => postMocks.MOCKED_UPDATED_DATE);

    // 2) Update the post
    const updatedPost = await service.update(postMocks.post.id, postUpdateDTO);
    const expectedUpdatedPost: Post = {
      ...postMocks.post,
      updated_at: new Date(postMocks.MOCKED_UPDATED_DATE).toISOString(),
      text: updatedText,
    };
    expect(updatedPost).toEqual(expectedUpdatedPost);

    // 3) Verify that the post was updated
    const postQuery = await service.findOne(postMocks.post.id);
    expect(postQuery).toEqual(expectedUpdatedPost);
  });

  test('Removing a post', async () => {
    // 1) Create the post
    await createPostUtil();

    // 2) Find the post to assert that the post was created
    const postQuery = await service.findOne(postMocks.post.id);
    expect(postQuery).toEqual(postMocks.post);

    // 3) Remove the post
    const removedPost = await service.remove(postMocks.post.id);
    expect(removedPost).toBe(true);

    // 4) Verify that the post was removed
    const postQueryAfterRemove = await service.findOne(postMocks.post.id);
    expect(postQueryAfterRemove).toBeUndefined();
  });
});
