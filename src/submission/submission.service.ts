import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './entity/submission.entity';
import { CreateSubmisionDTO } from './submission.dto';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
  ) {}

  async find(): Promise<Submission[]> {
    return await this.submissionRepository.find();
  }

  async findOne(id: string): Promise<Submission> {
    return await this.submissionRepository.findOne();
  }

  async create(
    submission: CreateSubmisionDTO,
    grade: number,
  ): Promise<Submission> {
    return await this.submissionRepository
      .create({ ...submission, grade })
      .save();
  }
}
