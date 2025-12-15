import { ApiProperty } from '@nestjs/swagger';
import { DefaultResponseDto } from './default-response.dto';
import { IsOptional } from 'class-validator';

export class SingleResponseDto<T> extends DefaultResponseDto {
  @ApiProperty({
    description: '응답 결과 데이터',
  })
  @IsOptional()
  data?: T;

  of() {}
}
