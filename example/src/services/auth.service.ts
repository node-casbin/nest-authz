import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { JwtPayload, User } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userSrv: UserService,
    private readonly jwtSrv: JwtService,
  ) {}

  async validateJwt(payload: JwtPayload): Promise<User> {
    return await this.userSrv.findById(payload.id);
  }

  async login(username: string, password: string) {
    const user = await this.userSrv.verifyCredentials(username, password);

    if (!user) {
      throw new UnauthorizedException('username or password incorrect!');
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = this.jwtSrv.sign(payload);
    return {
      userId: user.id,
      access_token: token,
    };
  }

  async register(user: User) {
    await this.userSrv.addUser(user);
  }
}
