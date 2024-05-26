import { Field, InputType } from '@nestjs/graphql';
import { PostElement } from '../entities/post-element.entity';

@InputType()
export class UpdatePostInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  cover_image_url?: string;

  @Field({ nullable: true })
  elements?: PostElement[];
}
