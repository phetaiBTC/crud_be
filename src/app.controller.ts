import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('home')
  home() {
    return this.appService.getHome();
  }

  @Post()
  createHome(@Body() body) {
    return {
      answer: body.a + body.b,
    }
  }
}
