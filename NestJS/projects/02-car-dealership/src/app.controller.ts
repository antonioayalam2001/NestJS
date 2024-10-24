import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log('AppController loaded');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/post')
  postMessage(): string {
    return this.appService.postMessage();
  }
}
