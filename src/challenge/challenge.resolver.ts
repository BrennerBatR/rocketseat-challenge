import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { lastValueFrom } from 'rxjs';
import { CreateSubmisionDTO } from 'src/submission/submission.dto';
import { ChallengeService } from './challenge.service';
import { Challenge } from './entity/challenge.entity';

@Resolver()
export class ChallengeResolver {
  constructor(private readonly challengeService: ChallengeService) {}

  /*  @Query(() => [Challenge])
  public async getAllChallenges(
    @Args('search') search?: string,
    @Args('take') take: number = 10,
    @Args('skip') skip: number = 0,
  ): Promise<Challenge[]> {
    return this.challengeService.find(take, skip, search);
  }

  @Query((returns) => Challenge)
  async getChallengeById(@Args('id') id: string): Promise<Challenge> {
    return await this.challengeService.findOne(id);
  }

  @Mutation((returns) => Challenge)
  async answerChallenge(
    @Args('challenge') challengeDto: CreateSubmisionDTO,
  ): Promise<Challenge> {
    const challenge = await this.challengeService.create(challengeDto);
    if (challenge.status !== ChallengeStatus.Error)
      this.getCorrection(challenge);
    return challenge;
  }

  async getCorrection(challenge: Challenge) {
    const correctLessonMessage: CorrectLessonMessage = {
      value: {
        challengeId: challenge.id,
        repositoryUrl: challenge.repositoryUrl,
      },
    };

    const result: CorrectLessonResponse = await lastValueFrom(
      this.clientKafka.send(
        this.pattern,
        JSON.stringify({
          key: correctLessonMessage.value.challengeId,
          value: JSON.stringify(correctLessonMessage.value),
        }),
      ),
    );

    challenge.grade = result.grade;
    challenge.status = result.status;
    await this.challengeService.update(challenge);
  } */
}
