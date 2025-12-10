import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  title: string;

  @IsOptional()
  content: string;

  @IsOptional()
  category: string;
}
