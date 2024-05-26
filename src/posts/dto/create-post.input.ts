import { Field, InputType } from '@nestjs/graphql';
import { PostAuthor } from '../entities/post-author.entity';
import { PostElement } from '../entities/post-element.entity';

@InputType()
export class CreatePostInput {
  @Field()
  author: PostAuthor;

  @Field()
  title: string;

  @Field()
  cover_image_url: string;

  @Field()
  elements: PostElement[];
}
