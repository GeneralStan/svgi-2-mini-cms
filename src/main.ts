import {ValidationPipe} from '@nestjs/common'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
/**
 * Below imported for Fastify use
 */
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import {join} from 'path';


async function bootstrap() {

  //The factory below uses Express by default. Commented out to use Fastify instead
  //const app = await NestFactory.create(AppModule);
  //Use Fastify

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    /*Below, I have deliberately added the options object elements here setting the values to the default. 
    There are many other fastify options, see https://www.fastify.io/docs/latest/Server/*/
    new FastifyAdapter({logger: false, ignoreTrailingSlash: false, bodyLimit: 1048576, caseSensitive: true}),
    //enable cors. Instead of simply setting to true which will use default config values, I am setting to object where I can set config values
    //see configuration options at the URL https://github.com/expressjs/cors#configuration-options
    {cors: {
      "origin": "*",//from which domains can request be made? For now, it is set to everywhere. Security may demand restrictions. See configuration options at https://github.com/expressjs/cors#configuration-options
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //which HTTP request verbs are allowed
      "preflightContinue": false,
      "optionsSuccessStatus": 204
    }}
    
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


   /**
   * Let's create static folders for public
   */
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  /**
   * Let's create folders for views template
   */
  app.setViewEngine({
    engine: {
      nunjucks: require('nunjucks'),
    },
    templates: join(__dirname, '..', 'views'),
  });


  //await app.listen(3001);--we're using fastify now. so see its implemeetation below 

   //For fastify, include 0.0.0.0 to listen on all IPs on the system. Otherwise, fastify will only listen on localhost.
   await app.listen(3002, '0.0.0.0');

   //More NOTES about fastify use: See https://docs.nestjs.com/techniques/performance for redirect and options
   console.log(`Application is running on: ${await app.getUrl()}`);
 
}
bootstrap();
