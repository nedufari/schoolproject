import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateNewUserDto, LoginDto } from '../auth/authdto';
import { GetUser } from '../auth/passport/jwtDecorator';
import { JwtGuard } from '../auth/passport/jwtGuard';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './userdto';

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  me(@GetUser() user: User) {
    return user;
  }

  @Post('signup')
  async Signup(@Body() signupdto: CreateUserDto) {
    return await this.userservice.Signup(signupdto);
  }
}
