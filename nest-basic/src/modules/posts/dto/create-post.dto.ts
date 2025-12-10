import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  category: string;
}
