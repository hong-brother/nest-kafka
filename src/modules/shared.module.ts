import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { GeneratorUtil } from '../utils/generator.util';
import { AppConfig } from '../configs/app.config';

const providers = [AppConfig, GeneratorUtil];
@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export class SharedModule {}
