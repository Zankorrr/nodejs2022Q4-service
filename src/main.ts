import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { mkdir, readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import 'dotenv/config';
import { AppModule } from './app.module';
import { MyLogger } from './logger/logger.service';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(MyLogger));
  try {
    readdir(join(__dirname, '../log'));
  } catch (error) {
    mkdir(join(__dirname, '../log'));
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const doc = await readFile(join(__dirname, '../doc/api.yaml'), 'utf-8');
  SwaggerModule.setup('doc', app, parse(doc));

  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
bootstrap();
