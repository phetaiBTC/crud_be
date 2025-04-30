import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Bee!';
  }

  getHome() {
    return {
      message: 'Hello World!',
    };
  }
}
