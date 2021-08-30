import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubmisionDTO {
  @Field()
  repositoryUrl: string;
  @Field()
  challengeId: string;
}
