import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Jwt } from "jsonwebtoken";
import * as bcrypt from 'bcrypt'

import { JwtServices } from "../auth/passport/jwt.service";

@Injectable()
export class TokenService{
    constructor(private readonly jwtservice:JwtServices){}

    async createToken(id:string,email:string):Promise<any>{
        return await this.jwtservice.createToken({id,email})
    }
    
    async comparePassword(password:string, hash:string):Promise<boolean>{
        return bcrypt.compare(password,hash)

    }

    async hashpassword(password:string):Promise<string>{
        return bcrypt.hash(password,10)

    }
}