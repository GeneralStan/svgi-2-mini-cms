import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
//import { TypeOrmModule} from '@nestjs/typeorm'; //---no longer in use
import { DatabaseModule } from './app.database.module';
//import * as Joi from '@hapi/joi'; //---no longer in use
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule,
    ConfigModule.forRoot(),

    /*ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(), //--joi no longer in use, so we can comment this out
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      })
    }),*/
    
    DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
