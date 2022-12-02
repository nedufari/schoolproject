import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateNewUserDto, LoginDto } from './authdto';

@Controller('auth')
export class AuthController {

    constructor (private readonly authservice:AuthService){

    }

    @Post('login')
    async Login(@Body()logindto:LoginDto){
        return await this.authservice.Login(logindto)
    }


}
