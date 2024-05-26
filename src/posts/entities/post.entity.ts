import { Field, ObjectType } from '@nestjs/graphql';
import { PostAuthor } from './post-author.entity';
import { PostElement } from './post-element.entity';

@ObjectType({ description: 'post' })
export class Post {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  cover_image_url: string;

  @Field()
  author: PostAuthor;

  @Field()
  elements: PostElement[];

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}
