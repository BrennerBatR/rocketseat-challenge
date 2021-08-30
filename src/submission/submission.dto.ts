import { InputType, Field, OmitType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Submission } from './entity/submission.entity';

/* @InputType()
export class CreateSubmisionDTO {
  @Field()
  repositoryUrl: string;
  @Field()
  challengeId: string;
}
 */

@InputType()
export class CreateSubmisionDTO extends OmitType(Submission, [
  'id',
  'createDate',
  'updateDate',
  'grade',
  'status',
]) {
  @ApiProperty()
  @Field()
  repositoryUrl: string;

  @ApiProperty()
  @Field()
  challengeId: string;
}
