// Nest.js 애플리케이션 인스턴스를 생성하는데 필요한 유틸리티 가져옵니다
import { NestFactory } from '@nestjs/core';
// 애플레케이션의 루트 모듈을 가져옵니다
import { AppModule } from './modules/app/app.module';
// Swagger 모듈과 문서 설정을 위한 빌더를 가져옵니다
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-expetion.filter';

// 비동기 함수로 애플리케이션의 초기 설정을 시작
async function bootstrap() {
  // Nest 애플리케이션 인스턴스 생성
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  // DocumentBuilder를 사용해서 Swagger 문서의 기본 정보를 설정
  const config = new DocumentBuilder()
    .setTitle('nest js API 테스트 - 스웨거 문서') // 문서 페이지의 제목
    .setDescription('이거슨 API 스웨거 문서입니다') // 문서 페이지의 간략한 내용
    .setVersion('1.0') // API의 버전
    .addTag('오즈코딩스쿨') // 문서의 API들을 그룹화할 태그 (ex. users, posts) 를 미리 정의
    .build(); // 설정 완료하고 빌더 객체 생성

  // Swagger 문서 생성 함수 (Factory) 정의
  // SwaggerModule.createDocument()는 애플리케이션의 모든 라우트, DTO 등의 메타데이터를 읽어 OAS 규격에 맞게 JSON 객체 생성하는 함수
  // setup() 함수가 문서 객체 대신 문서를 생성하는 팩토리를 받도록 정의
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  // Swagger UI 엔드포인트 설정
  // 'api' 경로에 Swagger UI 인터페이스 설정
  // ex) http://localhost:3000/api로 접속하여 문서를 볼 수 있다
  // 두번째 인자(app)는 Nest 애플리케이션 인스턴스
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
