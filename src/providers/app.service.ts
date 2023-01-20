import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { AppConfig } from '../configs/app.config';

@Injectable()
export class AppService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(private appConfig: AppConfig) {}

  getHello(): string {
    return 'Hello World!';
  }

  onApplicationBootstrap(): any {
    this.appConfig.initialize();
  }

  onApplicationShutdown(signal?: string): any {
    console.log('shutdown');
  }
}
