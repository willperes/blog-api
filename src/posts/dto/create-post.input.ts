import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostAuthorInput {
  @Field()
  image_url: string;

  @Field()
  name: string;
}

@InputType()
export class CreatePostInput {
  @Field()
  author: PostAuthorInput;

  @Field()
  title: string;

  @Field()
  cover_image_url: string;

  @Field()
  text: string;
}
