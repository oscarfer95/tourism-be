import { Injectable, Inject } from '@nestjs/common';
import config from './config';
import { ConfigType } from '@nestjs/config';
@Injectable()
export class AppService {

  constructor(@Inject(config.KEY) private _configService: ConfigType<typeof config>) {
  }
}
