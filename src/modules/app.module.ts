import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../providers/app.service';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from '../configs/app.config';
import { SharedModule } from './shared.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig.getConfig],
      isGlobal: true,
      cache: true,
    }),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
