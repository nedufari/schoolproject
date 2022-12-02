import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "./jwt.interface";
import * as jwt from 'jsonwebtoken';
@Injectable()

export class JwtServices {
    constructor(private readonly configservice:ConfigService){ }

    async createToken(jwtPayload:JwtPayload ){
    if (jwtPayload.email){
        const expiresIn= this.configservice.get('EXPIRESIN')
        const secretOrKey= this.configservice.get('SECRETKEY');
        const userinfo =jwtPayload;
        const token = jwt.sign(userinfo,secretOrKey,{ expiresIn })

        return{
        
            accesstoken:token
        }
    }
}
}