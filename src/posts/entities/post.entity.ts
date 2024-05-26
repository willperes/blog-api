import { Field, ObjectType } from '@nestjs/graphql';

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
  text: string;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}

@ObjectType({ description: 'postAuthor' })
export class PostAuthor {
  @Field()
  image_url: string;

  @Field()
  name: string;
}
