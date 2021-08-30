import { Module } from '@nestjs/common';
import { ChallengeModule } from './challenge/challenge.module';
import { SubmissionModule } from './submission/submission.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    ChallengeModule,
    SubmissionModule,
  ],
})
export class AppModule {}
