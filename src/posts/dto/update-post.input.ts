import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
  @Field()
  id: number;

  @Field()
  text: string;
}
