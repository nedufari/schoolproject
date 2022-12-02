import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from '../typeorm/typeorm.service';
import { UserRepository } from './userRepository';
import { JwtServices } from '../auth/passport/jwt.service';
import { TokenService } from './token.service';
import { User } from '../entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { Hospital } from '../entities/hospital.entity';
import { Laboratory } from '../entities/laboratory.entity';
import { Pharmacy } from '../entities/pharmacy.entity';


@Module({
  providers: [UserService,JwtServices,TokenService],
  controllers: [UserController],
  imports:[TypeOrmModule.forFeature([User,Hospital,Laboratory,Pharmacy]),
  PassportModule.register({defaultStrategy:'jwt'})],
  exports:[UserService,TokenService]
  
})
export class UserModule {}
