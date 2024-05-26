import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostsRepositoryImpl } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly repository: PostsRepositoryImpl) {}

  async create(createPostInput: CreatePostInput): Promise<Post> {
    const now = new Date(Date.now());
    const postData: Omit<Post, 'id'> = {
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
      ...createPostInput,
    };

    const post = await this.repository.create(postData);
    return post;
  }

  async findOne(id: number): Promise<Post | undefined> {
    const post = await this.repository.findOne(id);
    return post;
  }

  async findAll(): Promise<Post[]> {
    const allPosts = await this.repository.findAll();
    return allPosts;
  }

  async update(id: number, updatePostInput: UpdatePostInput): Promise<Post> {
    const post = await this.findOne(id);

    if (!post) {
      throw new NotFoundException('No posts were found with the given id');
    }

    const now = new Date(Date.now());
    // TODO: remove nullish operator when a database is implemented
    const updateData: Post = {
      ...post,
      updated_at: now.toISOString(),
      title: updatePostInput.title ?? post.title,
      cover_image_url: updatePostInput.cover_image_url ?? post.cover_image_url,
      elements:
        updatePostInput.elements?.length > 0
          ? updatePostInput.elements
          : post.elements,
    };

    const updatedPost = await this.repository.update(id, updateData);
    return updatedPost;
  }

  async remove(id: number): Promise<boolean> {
    const removedPost = await this.repository.remove(id);
    return removedPost;
  }
}
