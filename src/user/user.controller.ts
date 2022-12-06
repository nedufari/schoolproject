import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { time } from 'console';
import { DeleteDateColumn } from 'typeorm';
import { CreateNewUserDto, LoginDto } from '../auth/authdto';
import { GetUser } from '../auth/passport/jwtDecorator';
import { JwtGuard } from '../auth/passport/jwtGuard';
import { Roles } from '../auth/passport/role.decorator';
import { User, userRole } from '../entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto, HospitalCreateDto, HospitalUpdateDto, LaboratoryCreateDto, LaboratoryUpdateDto, PharmacyCreateDto } from './userdto';


@Controller('user')
export class UserController {
    constructor(private userservice:UserService){}


    @UseGuards(JwtGuard)
    @Get('me')
    me (@GetUser()user:User,){
        return user
    }

    @Post('signup')
    async Signup(@Body()signupdto:CreateUserDto){
        return await this.userservice.Signup(signupdto)
    }

   //users getting hospitals by various parameters


   @Roles(userRole.PATIENT)
   @UseGuards(JwtGuard)
   @Get('hospital')
   async getallhospital(@GetUser()userid:string){
    return await this.userservice.getallhospital(userid)
   }

   @Roles(userRole.PATIENT)
   @UseGuards(JwtGuard)
   @Get('/hospital/:hospitalname')
   async findhospitalbyname(@GetUser()userid:string,@Param("hospitalname")hospitalname:string){
    return await this.userservice.getalonehospitalbyname(userid,hospitalname)
   }

   @UseGuards(JwtGuard)
   @Get('/hospital/:state')
   async findhospitalbystate(@GetUser()userid:string,@Param('state')state:string){
    return await this.userservice.findhospitalbystate(userid,state)
   }

   @Roles(userRole.PATIENT)
   @UseGuards(JwtGuard)
   @Get('/hospital/:Rcnumber')
   async findhospitalbyRcnumber(@GetUser()userid:string,@Param('Rcnumber')Rcnumber:string){
    return await this.userservice.findhospitalbyRcnumber(userid,Rcnumber)
   }

   


   @Roles(userRole.PATIENT)
   @UseGuards(JwtGuard)
   @Get('/hospital/:country')
   async findhopsitalbycountry(@GetUser()userid:string,@Param("country")country:string){
    return await this.userservice.findhsopitalbycountry(userid,country)
   }


   @Roles(userRole.PATIENT)
   @UseGuards(JwtGuard)
   @Get('/hospital/:specilization')
   async findhospitalbysepcilaization(@GetUser()userid:string,@Param("specialization")speclization:string){
    return await this.userservice.findhospitalbyspecilization(userid,speclization)
   }


   //delete hospital done by the hospital users only

   @Roles(userRole.VENDOR)
   @Delete('/hospital/:userid')
   async deletehospital(@Param('userid')userid:string){
    return await this.userservice.deletehospital(userid)
   }

   @Put('/update/:userid')
   async updatehospital(@Param('userid')userid:string, @Body()hopsitalupdatedto:HospitalUpdateDto){
    return await this.userservice.updatehospital(hopsitalupdatedto,userid)
   }



// crud for the pharmacy vendor

@Roles(userRole.PATIENT)
@UseGuards(JwtGuard)
@Get('pharmacy')
async getallpharmacy(@GetUser()userid:string){
 return await this.userservice.getallpharmacy(userid)
}

@Roles(userRole.PATIENT)
@UseGuards(JwtGuard)
@Get('/hospital/:pharmacyname')
async findpharmacybyname(@GetUser()userid:string,@Param("pharmacyname")pharmacyname:string){
 return await this.userservice.getalonehospitalbyname(userid,pharmacyname)
}

@UseGuards(JwtGuard)
@Get('/pharmacy/:state')
async findpharmacybystate(@GetUser()userid:string,@Param('state')state:string){
 return await this.userservice.findpharmacybystate(userid,state)
}

@Roles(userRole.PATIENT)
@UseGuards(JwtGuard)
@Get('/pharamacy/:Rcnumber')
async findpharmacybyRcnumber(@GetUser()userid:string,@Param('Rcnumber')Rcnumber:string){
 return await this.userservice.findpharmacybyRcnumber(userid,Rcnumber)
}




@Roles(userRole.PATIENT)
@UseGuards(JwtGuard)
@Get('/pharmacy/:country')
async findpharmacybycountry(@GetUser()userid:string,@Param("country")country:string){
 return await this.userservice.findpharmacybycountry(userid,country)
}





//delete hospital done by the hospital users only

@Roles(userRole.VENDOR)
@Delete('/phrmacy/:id')
async deletepharmacy(@GetUser()userid:string,@Param('id')id:string){
 return await this.userservice.deletePharmacy(userid)
}

@Put('/update/:id')
async updatepharmacy(@GetUser()userid:string,@Param('id')id:string, @Body()hopsitalupdatedto:HospitalUpdateDto){
 return await this.userservice.updatehospital(hopsitalupdatedto,userid)
}


//crud controller for the laboratory 

@Roles(userRole.PATIENT)
@UseGuards(JwtGuard)
@Get('laboratory')
async getalllab(@GetUser()userid:string){
 return await this.userservice.getalllab(userid)
}

@Roles(userRole.PATIENT)
@UseGuards(JwtGuard)
@Get('/lab/:pharmacyname')
async findlabbyname(@GetUser()userid:string,@Param("labname")labname:string){
 return await this.userservice.getalllabbyname(userid,labname)
}

@Roles(userRole.PATIENT)
@UseGuards(JwtGuard)
@Get('/lab/:state')
async findlabbystate(@GetUser()userid:string,@Param('state')state:string){
 return await this.userservice.findlabbystate(userid,state)
}

@Roles(userRole.PATIENT)
@UseGuards(JwtGuard)
@Get('/lab/:Rcnumber')
async findlabbyRcnumber(@GetUser()userid:string,@Param('Rcnumber')Rcnumber:string){
 return await this.userservice.findlabbyRcnumber(userid,Rcnumber)
}




@Roles(userRole.PATIENT)
@UseGuards(JwtGuard)
@Get('/lab/:country')
async findlabbycountry(@GetUser()userid:string,@Param("country")country:string){
 return await this.userservice.findlabbycountry(userid,country)
}





//delete hospital done by the hospital users only

@Roles(userRole.VENDOR)
@Delete('/phrmacy/:id')
async deleteLab(@GetUser()userid:string,@Param('id')id:string){
 return await this.userservice.deleteLab(userid)
}


@Roles(userRole.VENDOR)
@Put('/update/:id')
async updateLab(@GetUser()userid:string,@Param('id')id:string, @Body()labupdatedto:LaboratoryUpdateDto){
 return await this.userservice.updateLab(labupdatedto,userid)
}


   
}
