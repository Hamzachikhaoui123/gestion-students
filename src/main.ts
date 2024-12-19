import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './Exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist:true,disableErrorMessages:true,forbidNonWhitelisted:true})),
  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
