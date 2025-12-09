import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    findAll () {
        return "전체 유저 조회"
    }
}
