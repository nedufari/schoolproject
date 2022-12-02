import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'crypto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { TokenService } from '../user/token.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/userdto';
import { AuthRepository } from './auth.repository';
import { LoginDto, LoginResponse } from './authdto';
import { JwtServices } from './passport';

@Injectable()
export class AuthService {
    
    
    constructor (@InjectRepository(User)
        private readonly authrepository: Repository<User>, private tokenservice:TokenService, private jwt:JwtService, private config:ConfigService){

    }

    async Login(logindto:LoginDto){
        const finduser = await this.authrepository.findOne({where:[{email:logindto.email}]})
        if(!finduser){
            throw new HttpException('message',HttpStatus.NOT_FOUND)
        }

        const comaprepassword = await this.tokenservice.comparePassword(logindto.password,finduser.password)
        if (!comaprepassword){
            throw new HttpException('message',HttpStatus.NOT_FOUND)
        

        }
        return this.signToken(finduser.id,finduser.email)
    }

   
    

    async signToken(id:string,email:string){
        const payload ={
            sub: id,
            email

        }     
        
        const secret  =   this.config.get('SECRETKEY')  
        const token  = await this.jwt.signAsync(payload,{
            expiresIn:this.config.get('EXPIRESIN'),
            secret:secret
        })   
        return {accesstoken:token}                    
    }
}
