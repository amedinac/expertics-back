import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(private config: ConfigService) {}
  getHello(): string {
    const dbUri = this.config.get('DB_URI');
    return `Esta es la BD_URI: ${dbUri}`;
  }
}
