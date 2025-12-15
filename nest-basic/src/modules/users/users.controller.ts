import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto, SignInDto } from './dto';

// 1️⃣ 클래스 데코레이터 (Class Decorator)
// - 이 클래스가 컨트롤러이며, 기본 경로가 '/users'임을 Nest.js에 알림
@Controller('users')
export class UsersController {
  // ✅ 생성자 주입 (Constructor Injection)
  // - UsersService를 자동으로 의존성 주입받음
  constructor(private readonly usersService: UsersService) {}

  // 회원가입
  @Post('sign-up')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() body: SignUpDto) {
    await this.usersService.signUp(body);
    return {
      message: '회원가입 성공!',
    };
  }

  // 로그인
  @Post('sign-in')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() body: SignInDto) {
    const res = await this.usersService.signIn(body);
    return res;
  }
}
