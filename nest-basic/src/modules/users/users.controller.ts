import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

// 1️⃣ 클래스 데코레이터 (Class Decorator)
// - 이 클래스가 컨트롤러이며, 기본 경로가 '/users'임을 Nest.js에 알림
@Controller('users')
export class UsersController {
  // ✅ 생성자 주입 (Constructor Injection)
  // - UsersService를 자동으로 의존성 주입받음
  constructor(private readonly usersService: UsersService) {}

  // 3️⃣ 메서드 데코레이터 (Method Decorator)
  // - 이 메서드는 GET /users/:id 요청을 처리함
  @Get(':id')
  findOne(
    // 4️⃣ 매개변수 데코레이터 (Parameter Decorator)
    // - 요청 경로에서 id 값을 추출하여 매개변수에 주입
    @Param('id') id: string,
  ) {
    return `User ID: ${id}`;
  }

  @Get()
  findAll () {
    return this.usersService.findAll()
  }
}
