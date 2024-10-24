import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  postMessage(): string {
    return 'Congrats!';
  }
  constructor() {
    console.log('AppService loaded');
  }
}
