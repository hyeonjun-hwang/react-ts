import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // typeORM을 전역에서 사용하기 위한 설정
    TypeOrmModule.forRoot({
      type: 'postgres', // DB 종류
      host: 'localhost', // DB 호스트 (기본값: localhost)
      port: 5432, // DB 포트 (기본값: 5432)
      username: 'admin', // DB 접속 계정 (실제 존재하는 계정 입력, 외부 노출 X)
      password: '1234', // DB 접속 비밀번호 (실제 존재하는 비밀번호 입력, 외부 노출 X)
      database: 'test_db', // DB 이름
      entities: [__dirname + '/../**/*.entity.{js,ts}'], // 엔티티 파일 위치
      synchronize: true, // 엔티티 기반으로 테이블 자동 생성 & 데이터베이스 동기화 (개발 환경에서만 사용, 프로덕션 환경에서는 반드시! false로 설정)
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
