import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { TypeormService } from '../typeorm/typeorm.service';
import { TokenService } from '../user/token.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/userRepository';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtServices } from './passport/jwt.service';
import { JwtGuard } from './passport/jwtGuard';
import { JwtStrategy } from './passport/jwtStrategy';

@Module({
  providers: [AuthService,JwtServices,JwtStrategy,JwtGuard,],
  controllers:[AuthController],
  imports:[ UserModule, 
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}),
  
  PassportModule.register({defaultStrategy:'jwt'})],
  exports:[AuthService]

})
export class AuthModule {}

