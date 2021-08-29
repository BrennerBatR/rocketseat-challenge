import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('submission')
export class SubmissionController implements OnModuleInit {
  pattern: string;
  constructor(
    @Inject('KAFKA_SERVICE')
    private clientKafka: ClientKafka,
  ) {
    this.pattern = 'challenge.correction';
  }

  @Get('correction')
  async correction() {
    const result = this.clientKafka.send(
      this.pattern,
      JSON.stringify({
        key: 'key ' + Math.random(),
        value: JSON.stringify({
          submissionId: 'submissionId ' + Math.random(),
          repositoryUrl: 'repositoryUrl ' + Math.random(),
        }),
      }),
    );

    return result;
  }

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf(this.pattern);
  }
}
