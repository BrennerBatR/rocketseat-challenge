import {
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Field } from '@nestjs/graphql';

export abstract class BaseCollection extends BaseEntity {
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
}
