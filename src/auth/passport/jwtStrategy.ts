import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../../user/user.service";
import { CurrentUserResponseDto } from "../../user/userdto";
import { JwtPayload } from "./jwt.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(private readonly userservice:UserService, readonly configservice:ConfigService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:configservice.get("SECRETKEY")
        })
    }

    async validate (payload:JwtPayload): Promise<CurrentUserResponseDto>{
        const user = await this.userservice.me(payload.id)
        if (!user){
            throw new UnauthorizedException();

        }
        return user;
    }
}
