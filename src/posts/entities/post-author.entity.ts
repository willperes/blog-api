import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'postAuthor' })
export class PostAuthor {
  @Field()
  image_url: string;

  @Field()
  name: string;
}
