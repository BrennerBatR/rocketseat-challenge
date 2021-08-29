import { ApiProperty } from '@nestjs/swagger';
import { BaseCollection } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';
import { IsString, IsUUID } from 'class-validator';

export enum StatusEnum {
  Pending = 'Pending',
  Error = 'Error',
  Done = 'Done',
}

@Entity()
export class Submission extends BaseCollection {
  @ApiProperty()
  @IsString()
  @Column({ length: 100 })
  repositoryUrl: string;

  @ApiProperty({ enum: StatusEnum })
  @Column({ length: 10, default: StatusEnum.Pending })
  status: string;

  @ApiProperty()
  @Column({ type: 'double precision' })
  grade: number;

  @ApiProperty()
  @IsUUID()
  @Column()
  challengeId: string;
}
