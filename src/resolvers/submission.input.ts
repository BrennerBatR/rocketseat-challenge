import { Field, InputType } from 'type-graphql';

@InputType()
class SubmissionInput {
  @Field()
  readonly repositoryUrl: string;
}

export default SubmissionInput;
