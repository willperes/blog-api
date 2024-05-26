import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

const memory: Post[] = [];

@Injectable()
export class PostsService {
  async create(createPostInput: CreatePostInput): Promise<Post> {
    const id = memory.length > 0 ? memory[memory.length - 1].id + 1 : 1;

    const now = new Date();
    const post: Post = {
      id,
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
      ...createPostInput,
    };

    memory.push(post);

    return post;
  }

  async findAll(): Promise<Post[]> {
    return memory;
  }

  async findOne(id: number): Promise<Post | undefined> {
    const post = memory.find((p) => p.id === id);
    return post;
  }

  async update(id: number, updatePostInput: UpdatePostInput): Promise<Post> {
    const postIndex = memory.findIndex((p) => p.id === id);

    if (postIndex === -1) {
      throw new NotFoundException('No posts were found with the given id');
    }

    const post = memory[postIndex];
    const now = new Date();
    const newPost: Post = {
      ...post,
      updated_at: now.toISOString(),
      text: updatePostInput.text,
    };

    memory[postIndex] = newPost;

    return newPost;
  }

  async remove(id: number): Promise<boolean> {
    const postIndex = memory.findIndex((p) => p.id === id);

    if (postIndex === -1) {
      throw new NotFoundException('No posts were found with the given id');
    }

    memory.splice(postIndex, 1);
    return true;
  }
}
