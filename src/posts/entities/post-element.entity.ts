import { Field, ObjectType } from '@nestjs/graphql';

export enum PostElementType {
  Title = 'Title',
  Subtitle = 'Subtitle',
  Paragraph = 'Paragraph',
  Image = 'Image',
}

@ObjectType({ description: 'postElement' })
export class PostElement {
  @Field()
  type: PostElementType;

  @Field()
  content: string;
}
