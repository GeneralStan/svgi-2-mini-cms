import {ValidationPipe} from '@nestjs/common'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
/**
 * Below imported for Fastify use
 */
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';


async function bootstrap() {

  //The factory below uses Express by default. Commented out to use Fastify instead
  //const app = await NestFactory.create(AppModule);
  //Use Fastify

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    /*Below, I have deliberately added some options object elements here setting the values to the default. 
    There are many other fastify options, see https://www.fastify.io/docs/latest/Server/*/
    new FastifyAdapter({logger: false, ignoreTrailingSlash: false, bodyLimit: 1048576, caseSensitive: true})
    
    );
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


  //await app.listen(3001);--we're using fastify now. so see its implemeetation below 

   //For fastify, include 0.0.0.0 to listen on all IPs on the system. Otherwise, fastify will only listen on localhost.
   await app.listen(3001, '0.0.0.0');

   //More NOTES about fastify use: See https://docs.nestjs.com/techniques/performance for redirect and options
   console.log(`Application is running on: ${await app.getUrl()}`);
 
}
bootstrap();
