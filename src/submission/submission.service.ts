import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindConditions,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  Repository,
} from 'typeorm';
import { Submission, SubmissionStatus } from './entity/submission.entity';
import { CreateSubmisionDTO } from './submission.dto';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
  ) {}

  async find(
    take: number,
    skip: number,
    status?: SubmissionStatus,
    dateStart?: string,
    dateEnd?: string,
  ): Promise<Submission[]> {
    const findConditions: FindConditions<Submission> = {};
    if (status) findConditions.status = status;
    if (dateStart) findConditions.createDate = Between(dateStart, dateEnd);

    return await this.submissionRepository.find({
      where: findConditions,
      take,
      skip,
      order: { createDate: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Submission> {
    return await this.submissionRepository.findOne();
  }

  async create(submission: CreateSubmisionDTO): Promise<Submission> {
    let status = SubmissionStatus.Pending;

    if (!submission.repositoryUrl.match(/github.com/))
      status = SubmissionStatus.Error;
    else if (
      submission.repositoryUrl.split('github.com/')[1].split('/').length !== 2
    )
      status = SubmissionStatus.Error;

    return await this.submissionRepository
      .create({ ...submission, status })
      .save();
  }

  async update(submission: Submission): Promise<Submission> {
    return await (await this.submissionRepository.preload(submission)).save();
  }
}
