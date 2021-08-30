import { ApiProperty } from '@nestjs/swagger';
import { BaseCollection } from 'src/common/base.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, IsUUID } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

export enum StatusEnum {
  Pending = 'Pending',
  Error = 'Error',
  Done = 'Done',
}

@ObjectType()
@Entity()
export class Submission extends BaseEntity {
  @ApiProperty()
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ApiProperty()
  @Field()
  @CreateDateColumn({
    type: 'timestamp',
  })
  createDate: string;

  @ApiProperty()
  @Field()
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateDate: string;
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
  @Column({ type: 'double precision', default: null })
  grade: number;

  @ApiProperty()
  @IsUUID()
  @Field()
  @Column()
  challengeId: string;
}
