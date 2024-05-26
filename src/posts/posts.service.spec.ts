import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { postMock } from './__mocks__/PostMock';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { PostsRepositoryImpl } from './posts.repository';

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
      .mockImplementation(() => postMock.MOCKED_CREATED_DATE);

    const postDTO: CreatePostInput = {
      author: postMock.post.author,
      text: postMock.post.text,
    };

    return service.create(postDTO);
  }

  test('Creating a new post', async () => {
    // 1) Create a new post
    const createdPost = await createPostUtil();
    expect(createdPost).toMatchObject(postMock.post);

    // 2) Find the post to assert that the post was created
    const postQuery = await service.findOne(postMock.post.id);
    expect(postQuery).toEqual(postMock.post);
  });

  test('Updating a post', async () => {
    const updatedText = 'This is an updated post text';
    const postUpdateDTO: UpdatePostInput = {
      id: postMock.post.id,
      text: updatedText,
    };

    // 1) Create the post
    await createPostUtil();

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => postMock.MOCKED_UPDATED_DATE);

    // 2) Update the post
    const updatedPost = await service.update(postMock.post.id, postUpdateDTO);
    const expectedUpdatedPost: Post = {
      ...postMock.post,
      updated_at: new Date(postMock.MOCKED_UPDATED_DATE).toISOString(),
      text: updatedText,
    };
    expect(updatedPost).toEqual(expectedUpdatedPost);

    // 3) Verify that the post was updated
    const postQuery = await service.findOne(postMock.post.id);
    expect(postQuery).toEqual(expectedUpdatedPost);
  });

  test('Removing a post', async () => {
    // 1) Create the post
    await createPostUtil();

    // 2) Find the post to assert that the post was created
    const postQuery = await service.findOne(postMock.post.id);
    expect(postQuery).toEqual(postMock.post);

    // 3) Remove the post
    const removedPost = await service.remove(postMock.post.id);
    expect(removedPost).toBe(true);

    // 4) Verify that the post was removed
    const postQueryAfterRemove = await service.findOne(postMock.post.id);
    expect(postQueryAfterRemove).toBeUndefined();
  });
});
