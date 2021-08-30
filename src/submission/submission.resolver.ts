import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Submission } from './entity/submission.entity';
import { CreateSubmisionDTO } from './submission.dto';
import { SubmissionService } from './submission.service';

@Resolver((of) => Submission)
export class SubmissionResolver {
  constructor(private readonly submissionService: SubmissionService) {}

  @Query(() => [Submission])
  public async getAllSubmissions(): Promise<Submission[]> {
    return this.submissionService.find();
  }

  @Query((returns) => Submission)
  async getSubmissionById(@Args('id') id: string): Promise<Submission> {
    return await this.submissionService.findOne(id);
  }

  @Mutation((returns) => Submission)
  async createSubmission(
    @Args('submission') submission: CreateSubmisionDTO,
  ): Promise<Submission> {
    let grade = 10;
    return await this.submissionService.create(submission, grade);
  }
}
