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
      title: postMocks.post.title,
      cover_image_url: postMocks.post.cover_image_url,
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
    const updatedTitle = 'Updated Title';
    const updatedCoverImageUrl = 'https://foo.com/updated-image.png';
    const postUpdateDTO: UpdatePostInput = {
      id: postMocks.post.id,
      title: updatedTitle,
      cover_image_url: updatedCoverImageUrl,
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
      title: updatedTitle,
      cover_image_url: updatedCoverImageUrl,
      text: updatedText,
    };
    expect(updatedPost).toEqual(expectedUpdatedPost);

    // 3) Verify that the post was updated
    const postQuery = await service.findOne(postMocks.post.id);
    expect(postQuery).toEqual(expectedUpdatedPost);
  });

  test('Update only one post field', async () => {
    const updatedTitle = 'Updated Title';
    const postUpdateDTO: UpdatePostInput = {
      id: postMocks.post.id,
      title: updatedTitle,
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
      title: updatedTitle,
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
