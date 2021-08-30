import { ApiProperty } from '@nestjs/swagger';
import { BaseCollection } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';
import { IsString, IsUUID } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

export enum StatusEnum {
  Pending = 'Pending',
  Error = 'Error',
  Done = 'Done',
}

@ObjectType()
@Entity()
export class Submission extends BaseCollection {
  @ApiProperty()
  @IsString()
  @Field()
  @Column({ length: 100 })
  repositoryUrl: string;

  @ApiProperty({ enum: StatusEnum })
  @Field()
  @Column({ length: 10, default: StatusEnum.Pending })
  status: string;

  @ApiProperty()
  @Field()
  @Column({ type: 'double precision' })
  grade: number;

  @ApiProperty()
  @IsUUID()
  @Field()
  @Column()
  challengeId: string;
}
