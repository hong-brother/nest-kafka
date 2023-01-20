import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { AppService } from '../providers/app.service';
import {
  Client,
  ClientKafka,
  Ctx,
  EventPattern,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { MicroserviceKafkaConfig } from '../configs/microserviceKafkaConfig';

@Controller()
export class AppController implements OnModuleInit {
  private logger = new Logger(AppController.name);

  @Client(MicroserviceKafkaConfig)
  client: ClientKafka;

  constructor(private readonly appService: AppService) {}

  onModuleInit(): any {
    const requestPatterns = ['entity-created'];

    requestPatterns.forEach((pattern) => {
      this.client.subscribeToResponseOf(pattern);
    });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('kafka-test')
  async setData() {
    this.client.emit<string>('entity-created', 'some entity ' + new Date());
  }
  @EventPattern('entity-created')
  async handleEntityCreated(payload: any) {
    console.log(JSON.stringify(payload) + ' created');
  }
}
