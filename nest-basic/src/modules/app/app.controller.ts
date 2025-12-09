import { Controller, Get } from '@nestjs/common';
import { AppService } from "./app.service"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get(":id")
  // getUser() {
  //   return "안녕하세요 저는 개발자입니다"
  // }
}
