import { Module } from '@nestjs/common';
import { ChallengeModule } from './challenge/challenge.module';
import { SubmissionModule } from './submission/submission.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ChallengeModule,
    SubmissionModule,
  ],
})
export class AppModule {}
