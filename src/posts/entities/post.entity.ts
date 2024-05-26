import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'post' })
export class Post {
  @Field()
  id: number;

  @Field()
  author: string;

  @Field()
  text: string;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;
}
