import { Injectable, Inject } from '@nestjs/common';
import config from './config';
import { ConfigType } from '@nestjs/config';
@Injectable()
export class AppService {

  constructor(@Inject(config.KEY) private _configService: ConfigType<typeof config>) {
  }

  getHello(): string {
    return 'App is UP in port: ' + (this._configService.port) + ', enviroment: ' + (this._configService.env);
  }
}
