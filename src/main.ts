import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';

axios.defaults.baseURL = 'https://fcd.terra.dev/v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('tx-history', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  await app.listen(3000);
}
bootstrap();
