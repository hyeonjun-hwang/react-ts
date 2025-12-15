import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

// response 할때 지켜야 하는 기본 구조
export class DefaultResponseDto {
  @ApiProperty({
    description: '응답 결과 메시지',
    example: '메시지 내용',
  })
  message: string;

  @ApiProperty({
    description: '응답 상태 코드',
    example: 200,
  })
  statusCode: HttpStatus;
}
