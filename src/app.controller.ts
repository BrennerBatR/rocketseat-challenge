import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, JsonSocket } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { AppService } from './app.service';

@Controller('correction')
export class AppController implements OnModuleInit {
  private kafkaProducer: Producer;
  constructor(
    @Inject('KAFKA_SERVICE')
    private clientKafka: ClientKafka,

    private readonly appService: AppService,
  ) {}

  @Get()
  async correction() {
    const result = await this.kafkaProducer.send({
      topic: 'challenge.correction',
      messages: [
        {
          key: 'key ' + Math.random(),
          value: JSON.stringify({
            submissionId: 'submissionId ' + Math.random(),
            repositoryUrl: 'repositoryUrl ' + Math.random(),
          }),
        },
      ],
    });

    return result;
  }

  async onModuleInit() {
    this.kafkaProducer = await this.clientKafka.connect();
  }
}
