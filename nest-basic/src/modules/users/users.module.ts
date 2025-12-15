import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  // imports : 이 모듈을 사용하기 위해 필요한 외부 모듈 목록
  imports: [
    // 이 모듈(users) 안에서 사용할 엔티티 등록
    // 등록된 엔티티 기반으로 레포지토리가 자동 생성
    // UsersService안에서 사용할 레포지토리 자동 생성
    // 즉, UsersMoule이 UserEntity 엔티티를 사용할 수 있도록 설정
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
