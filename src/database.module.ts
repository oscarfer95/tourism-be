import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import config from './config';

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (confirService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } = confirService.mongo;
        const uri =
          `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY]
    }
  ], exports: ['MONGO']
})
export class DatabaseModule { }
