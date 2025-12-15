import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'social_platform_id' })
  socialPlatformId: string;

  @Column({ name: 'social_platform_provider' })
  socialPlatformProvider: 'kakao' | 'google' | 'naver';

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'is_verified' })
  isVerified: boolean;

  @Column({ name: 'service_terms' })
  serviceTerms: boolean;

  @Column({ name: 'privacy_policy' })
  privacyPolicy: boolean;

  @Column({ name: 'marketing_consent' })
  marketingConsent: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
