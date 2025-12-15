import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: '이메일',
    example: 'test@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: '비밀번호',
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: '인증 여부',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isVerified: boolean;

  @ApiProperty({
    description: '서비스 이용약관 동의 여부',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  serviceTerms: boolean;

  @ApiProperty({
    description: '개인정보 수집 및 이용동의 여부',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  privacyPolicy: boolean;

  @ApiProperty({
    description: '마케팅 및 광고 수신 동의 여부',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  marketingConsent: boolean;
}
