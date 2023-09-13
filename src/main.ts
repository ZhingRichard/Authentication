import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as process from 'process';
async function bootstrap() {
  const port = process.env.LISTENING_PORT;
  const app = await NestFactory.
  create(AppModule);
  app.use(cookieParser());
  await app.listen(port || 3000);
}
bootstrap();
