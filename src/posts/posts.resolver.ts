import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation('createPost')
  async create(
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<Post> {
    return this.postsService.create(createPostInput);
  }

  @Query('posts')
  async findAll(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @Query('post')
  async findOne(@Args('id') id: number): Promise<Post | undefined> {
    return this.postsService.findOne(id);
  }

  @Mutation('updatePost')
  update(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation('removePost')
  async remove(@Args('id') id: number): Promise<boolean> {
    return this.postsService.remove(id);
  }
}
