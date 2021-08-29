import {
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseCollection extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
  })
  createDate: string;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateDate: string;

  @ApiProperty()
  @Column({ type: 'bool', name: 'active', default: true })
  active: boolean;
}
