import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Post } from './entities/post.entity';

interface PostsRepository {
  create(data: Omit<Post, 'id'>): Promise<Post>;
  findOne(id: number): Promise<Post | undefined>;
  findAll(): Promise<Post[]>;
  update(id: number, post: Post): Promise<Post>;
  remove(id: number): Promise<boolean>;
}

@Injectable()
export class PostsRepositoryImpl implements PostsRepository {
  private memory: Post[] = [];

  async create(data: Omit<Post, 'id'>): Promise<Post> {
    const id =
      this.memory.length > 0 ? this.memory[this.memory.length - 1].id + 1 : 1;

    const post: Post = { ...data, id };
    this.memory.push(post);
    return post;
  }

  async findOne(id: number): Promise<Post | undefined> {
    return this.memory.find((p) => p.id === id);
  }

  async findAll(): Promise<Post[]> {
    return this.memory;
  }

  async update(id: number, post: Post): Promise<Post> {
    const postIndex = this.memory.findIndex((p) => p.id === id);

    if (postIndex === -1) {
      throw new InternalServerErrorException();
    }

    this.memory[postIndex] = post;
    return post;
  }

  async remove(id: number): Promise<boolean> {
    const postIndex = this.memory.findIndex((p) => p.id === id);

    if (postIndex === -1) {
      throw new InternalServerErrorException();
    }

    this.memory.splice(postIndex, 1);
    return true;
  }
}
