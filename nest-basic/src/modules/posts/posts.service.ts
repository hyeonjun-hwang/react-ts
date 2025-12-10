import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: '토픽 제목 1',
      content: '토픽 콘텐츠 1',
      category: '카테1',
    },
    {
      id: 2,
      title: '토픽 제목 2',
      content: '토픽 콘텐츠 2',
      category: '카테2',
    },
    {
      id: 3,
      title: '토픽 제목 3',
      content: '토픽 콘텐츠 3',
      category: '카테3',
    },
    {
      id: 4,
      title: '토픽 제목 4',
      content: '토픽 콘텐츠 4',
      category: '카테4',
    },
  ];

  findAll(): Post[] {
    return this.posts;
  }

  findOne(postId: number): Post | undefined {
    const post = this.posts.find((post) => post.id === postId);

    if (!post) {
      throw new NotFoundException('데이터를 찾을 수 없습니다');
    }

    return post;
  }

  create(createPostDto: CreatePostDto) {}

  update(postId: number, updatePostDto: UpdatePostDto) {}

  remove(postId: number) {}
}
