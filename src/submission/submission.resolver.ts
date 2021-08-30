import { Inject, OnModuleInit } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Submission } from './entity/submission.entity';
import { CreateSubmisionDTO } from './submission.dto';
import { SubmissionService } from './submission.service';

@Resolver((of) => Submission)
export class SubmissionResolver implements OnModuleInit {
  pattern: string;
  constructor(
    private readonly submissionService: SubmissionService,

    @Inject('KAFKA_SERVICE')
    private clientKafka: ClientKafka,
  ) {
    this.pattern = 'challenge.correction';
  }

  @Query(() => [Submission])
  public async getAllSubmissions(): Promise<Submission[]> {
    return this.submissionService.find();
  }

  @Query((returns) => Submission)
  async getSubmissionById(@Args('id') id: string): Promise<Submission> {
    return await this.submissionService.findOne(id);
  }

  @Mutation((returns) => Submission)
  async answerChallenge(
    @Args('submission') submissionDto: CreateSubmisionDTO,
  ): Promise<Submission> {
    const submission = await this.submissionService.create(submissionDto);
    this.getCorrection(submission);
    return submission;
  }

  async getCorrection(submission: Submission) {
    const result = await lastValueFrom(
      this.clientKafka.send(
        this.pattern,
        JSON.stringify({
          key: submission.id,
          value: JSON.stringify({
            submissionId: submission.id,
            repositoryUrl: submission.repositoryUrl,
          }),
        }),
      ),
    );

    submission.grade = result.grade;
    submission.status = result.status;
    await this.submissionService.update(submission);
  }
  onModuleInit() {
    this.clientKafka.subscribeToResponseOf(this.pattern);
  }
}
