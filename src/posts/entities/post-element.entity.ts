import { Field, ObjectType } from '@nestjs/graphql';

export enum PostElementType {
  Title = 'title',
  Subtitle = 'subtitle',
  Paragraph = 'paragraph',
  Image = 'image',
}

@ObjectType({ description: 'postElement' })
export class PostElement {
  @Field()
  type: PostElementType;

  @Field()
  content: string;
}
