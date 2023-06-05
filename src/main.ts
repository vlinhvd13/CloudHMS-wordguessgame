import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Set the view engine and views directory
  app.setViewEngine('hbs'); //
  app.setBaseViewsDir(path.join(__dirname, '../pages')); // Update the directory where your views are located

  // Serve static files
  app.use(express.static(path.join(__dirname, '../assets')));


  await app.listen(3000);
}
bootstrap();
