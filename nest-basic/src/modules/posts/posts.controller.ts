import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 전체 조회
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  // 개별 조회
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) postId: number) {
    return this.postsService.findOne(postId);
  }

  // 생성
  @Post()
  @UsePipes(new ValidationPipe()) // 해당 핸들러에 파이프 적용
  create(@Body() createPostDto: CreatePostDto) {
    // 이곳에 도달했다면 유효성 검사를 통과한 상태임이 보장됨
    return this.postsService.create(createPostDto);
  }

  // 수정
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    this.postsService.update(postId, updatePostDto);
  }

  // 삭제
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  remove(@Param('id') postId: number) {
    this.postsService.remove(postId);
  }
}
