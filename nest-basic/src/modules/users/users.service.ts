import { Injectable } from '@nestjs/common';
import { SignUpDto, SignInDto } from './dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  // ✅ 생성자 주입 (Constructor Injection)
  // - UsersRepository를 자동으로 의존성 주입받음

  constructor(
    // ✅ @InjectRepository 데코레이터를 사용하여 UserEntity 엔티티를 주입받음
    // - TypeORM의 Repository<UserEntity> 타입을 사용하여 레포지토리 인스턴스를 자동으로 생성
    // - UsersService에서 UserEntity 엔티티를 사용할 수 있도록 설정
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async signUp(payload: SignUpDto) {
    const user = this.usersRepository.create({
      email: payload.email,
      password: payload.password,
      isVerified: payload.isVerified,
      serviceTerms: payload.serviceTerms,
      privacyPolicy: payload.privacyPolicy,
      marketingConsent: payload.marketingConsent,
    });
    return await this.usersRepository.save(user); // DB에 저장 (INSERT)
  }
  async signIn(payload: SignInDto) {
    return { session: 'session', user: 'user' };
  }
}
