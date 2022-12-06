import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { TypeormService } from './typeorm/typeorm.service';
import { TypeormModule } from './typeorm/typeorm.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
//import { CommonModule } from './Bot/common/common.module';
import {TypeOrmModule}from '@nestjs/typeorm'

@Module({
  imports: [
  ConfigModule.forRoot({isGlobal:true}),
  TypeOrmModule.forRootAsync({useClass:TypeormService}),
  AuthModule,
  UserModule,
  //CommonModule

    
  ],
  providers: [TypeormService],
  controllers: [AuthController],
 
})
export class AppModule {}
