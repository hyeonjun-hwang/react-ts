import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

// @Catch 데코레이터는 이 필터가 httpException 타입의 에러만 잡겠다는 뜻
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // exception에서 message 부분을 추출
    const errorResponse = exception.getResponse();
    const message =
      typeof errorResponse === 'object'
        ? errorResponse['message']
        : errorResponse;

    res.status(status).json({
      message: message,
      statusCode: status,
      path: req.url,
      timestamp: new Date().toISOString(),
      success: false,
    });
  }
}
