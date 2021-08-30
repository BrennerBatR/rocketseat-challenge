import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './entity/submission.entity';
import { SubmissionController } from './submission.controller';
import { SubmissionResolver } from './submission.resolver';
import { SubmissionService } from './submission.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Submission]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'challenge-consumer ' + Math.random(),
          },
        },
      },
    ]),
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService , SubmissionResolver],
})
export class SubmissionModule {}
