import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { PostsRepositoryImpl } from './posts.repository';
import { postMocks } from '../test-utils/posts/mocks';
import { PostElementType } from './entities/post-element.entity';

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
      elements: postMocks.post.elements,
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
    const updatedElements: Post['elements'] = [
      {
        type: PostElementType.Title,
        content: 'Updated content title',
      },
    ];
    const updatedTitle: Post['title'] = 'Updated Title';
    const updatedCoverImageUrl: Post['cover_image_url'] =
      'https://foo.com/updated-image.png';
    const postUpdateDTO: UpdatePostInput = {
      id: postMocks.post.id,
      title: updatedTitle,
      cover_image_url: updatedCoverImageUrl,
      elements: updatedElements,
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
      elements: updatedElements,
    };
    expect(updatedPost).toEqual(expectedUpdatedPost);

    // 3) Verify that the post was updated
    const postQuery = await service.findOne(postMocks.post.id);
    expect(postQuery).toEqual(expectedUpdatedPost);
  });

  test('Update only two post fields', async () => {
    const updatedTitle = 'Updated Title';
    const updatedElements: Post['elements'] = [
      {
        type: PostElementType.Title,
        content: 'Updated title here',
      },
    ];
    const postUpdateDTO: UpdatePostInput = {
      id: postMocks.post.id,
      title: updatedTitle,
      elements: updatedElements,
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
      elements: updatedElements,
    };
    expect(updatedPost).toEqual(expectedUpdatedPost);

    // 3) Verify that the post was updated
    const postQuery = await service.findOne(postMocks.post.id);
    console.log(postQuery);
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
