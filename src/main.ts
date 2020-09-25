import {ValidationPipe} from '@nestjs/common'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Enable validation pipe. Requires npm install class-validator class-transformer
  app.useGlobalPipes(new ValidationPipe());
  //In production environment, better to disable detailed error message as shown below:
  /*
  app.useGlobalPipes(new ValidationPipe(
    {disableErrorMessages: true,}
  ));
  */

  /**
   * Pius note: You can set global prefix for routes e.g. for versioning purpose
   */

  //app.setGlobalPrefix('v1');


  await app.listen(3001);
}
bootstrap();
