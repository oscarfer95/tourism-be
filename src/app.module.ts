import * as Joi  from 'joi';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'
import { AttractionsModule } from './attractions/attractions.module';
import { ConfigModule } from '@nestjs/config';
import { environments } from 'enviroments';
import config from './config';
import { DatabaseModule } from './database.module';
// import { MongoClient } from 'mongodb';

// const uri = 'mongodb://root:root@localhost:27017/?authMechanism=DEFAULT';
// const client = new MongoClient(uri);
// async function run() {
//   await client.connect();
//   const database = client.db('turismo-GAMC');
//   const attractionsCollection = database.collection('attractions');
//   const attractions = await attractionsCollection.find().toArray();
//   console.log(attractions);
// }
// run();


@Module({
  imports: [
    AttractionsModule,
    DatabaseModule,
    ConfigModule.forRoot({
    envFilePath: environments[process.env.NODE_ENV] || '.env',
    isGlobal: true,
    load: [config],
    validationSchema: Joi.object({
      port: Joi.string().required(),
      feUrl: Joi.string().required(),
      corsOrigins: Joi.string().required()
    })
  })],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule { }
