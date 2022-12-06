import { forwardRef, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RckgAppResponse } from 'rckg-shared-library';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateNewUserDto, LoginDto } from '../auth/authdto';
import { Hospital } from '../entities/hospital.entity';
import { Laboratory } from '../entities/laboratory.entity';
import { Pharmacy } from '../entities/pharmacy.entity';
import { User,userRole,vendorName } from '../entities/user.entity';
import { TokenService } from './token.service';
import { CreateUserDto, CurrentUserResponseDto, HospitalCreateDto, HospitalUpdateDto, LaboratoryCreateDto, LaboratoryUpdateDto, PharmacyCreateDto, PharmacyUpdateDto, UserResponseDto } from './userdto'
import { UserRepository } from './userRepository';

@Injectable()
export class UserService {
    constructor ( 
        @InjectRepository(User)private readonly userepository:Repository<User>,
        @InjectRepository(Hospital)private readonly hospitalrepository:Repository<Hospital>,
        @InjectRepository(Pharmacy)private readonly pharmacyrepository:Repository<Pharmacy>,
        @InjectRepository(Laboratory)private readonly laboratoryrepository:Repository<Laboratory>,
        private tokenservice:TokenService
        )
        {
    }

   

    async me(userid:string):Promise<CurrentUserResponseDto>{
        const finduser = await this.userepository.findOne({where:[{id:userid}],select:['id','email','role','vendor']})
        if (!finduser){
            throw new HttpException('message',HttpStatus.NOT_FOUND)

        }

        return finduser
    }


    // for the sign up of users 

    async Signup(signupdto:CreateUserDto){
        const {email, password,role} = signupdto;
        switch (role) {
            case userRole.PATIENT:
                await this.patient(signupdto)
                break;

            case userRole.VENDOR:
                const user= new User();
                user.email=email
                user.password=await this.tokenservice.hashpassword(password)
                user.role=userRole.VENDOR

                const createuser= await this.userepository.save(user)
                if (createuser){
                    this.vendors(createuser, signupdto)
                } 
                return  createuser
                console.log(createuser)
                break;
        
            default:
                break;
        }
    }



    //function to check the email before registering he user
    async checkuserbymail(email:string):Promise<Boolean>{
        const user =  await this.userepository.findOne({where:{email:email},select:['id','email']})
        if (!user){
            return true
        }
        else false
    }



   // this is just for the patient creating new user because it is not a  a default user anf not a vendor 
    async patient(createuserdto:CreateUserDto){
        const {email, password,role}= createuserdto;
        const existingUser=  await  this.checkuserbymail(email)
        if (!existingUser){
            throw new HttpException('message',HttpStatus.FORBIDDEN)
        }
        const  user =  new User();
        user.email= createuserdto.email
        user.password= await this.tokenservice.hashpassword(createuserdto.password)
        user.role=userRole.PATIENT;
        return await this.userepository.save(user)

    }


   

    /// this part of the code is for the switch implemenntation of the implementation of only creating and registering various users and vendors

    private async  vendors(vendor:User, signupdto:CreateUserDto){
        switch (vendor.vendor) {
            case vendorName.HOSPITALL:
                const hospital = new Hospital()
                hospital.RC_number= signupdto.hopsitaldto.RC_number;
                hospital.hospital_name= signupdto.hopsitaldto.hospital_name;
                hospital.state= signupdto.hopsitaldto.location;
                hospital.country= signupdto.hopsitaldto.country;
                hospital.website= signupdto.hopsitaldto.website;
                hospital.email= signupdto.hopsitaldto.email;
                hospital.phone1= signupdto.hopsitaldto.phone1;
                hospital.bio= signupdto.hopsitaldto.bio;
                hospital.specializations= signupdto.hopsitaldto.specializations
                hospital.testimonies= signupdto.hopsitaldto.testimonies
                hospital.password=  await this.tokenservice.hashpassword(signupdto.hopsitaldto.password)
                
                
                return await this.hospitalrepository.save(hospital)
                
                break;

            case vendorName.LABORATORY:
                const lab=  new Laboratory();
                lab.RC_number = signupdto.labdto.RC_number;
                lab.email=signupdto.labdto.email
                lab.password=await this.tokenservice.hashpassword(signupdto.labdto.password)
                lab.laboratory_name=signupdto.labdto.laboratory_name;
                lab.country=signupdto.labdto.country;
                lab.website=signupdto.labdto.website;
                lab.bio=signupdto.labdto.bio;
                lab.state=signupdto.labdto.state;
                lab.phone1=signupdto.labdto.phone1;
                lab.location=signupdto.labdto.location
                
                return await this.laboratoryrepository.save(lab)
                break;

            case vendorName.PHHARMACY:
                const pharma=new Pharmacy();
                pharma.RC_number=signupdto.pharmadto.RC_number;
                pharma.email=signupdto.pharmadto.email;
                pharma.password=await this.tokenservice.hashpassword(signupdto.pharmadto.password);
                pharma.website=signupdto.pharmadto.website;
                pharma.phone1=signupdto.pharmadto.phone1;
                pharma.state=signupdto.pharmadto.state;
                pharma.breakthrough=signupdto.pharmadto.breakthrough;
                pharma.testimonies=signupdto.pharmadto.testimonies
                pharma.bio=signupdto.pharmadto.bio;
                pharma.pharmacy_name=signupdto.pharmadto.pharmacy_name;
                pharma.location=signupdto.pharmadto.location
                
                return this.pharmacyrepository.save(pharma)
        
            default:
                break;
        }
    
    }

//only the user can search for vendors but vendors cannot search for user 
//patient can update only its own data 
//patient can delete only its own data 
//patient can update only its own data

async getallhospital(userid:string):Promise<Hospital[]>{
    return await this.hospitalrepository.find({where:{id:userid}})
}

async getalonehospitalbyname(userid:string,hospital_name:string):Promise<Hospital>{
    return await this.hospitalrepository.findOne({where:{id:userid,hospital_name:hospital_name}})
}

async findhospitalbystate(userid:string,state):Promise<Hospital>{
    return await this.hospitalrepository.findOne({where:{id:userid,state:state}})
}
async findhsopitalbycountry(userid:string,country):Promise<Hospital>{
    return await this.hospitalrepository.findOne({where:{id:userid,country:country}})

}

async findhospitalbyRcnumber(userid:string,RC_number):Promise<Hospital>{
    return await this.hospitalrepository.findOne({where:{id:userid,RC_number:RC_number}})
    
}

async findhospitalbyspecilization(userid:string,specializations):Promise<Hospital>{
    return await this.hospitalrepository.findOne({where:{id:userid,specializations:specializations}})
}

async deletehospital(userid:string){
    const user  = await this.hospitalrepository.delete(userid)
    if (!user.affected){
        throw new HttpException(`the patient with id ${userid} is not found `,HttpStatus.NOT_FOUND)

    }
    return HttpStatus.NO_CONTENT
}

async updatehospital(updatehospitaldto:HospitalUpdateDto, userid:string){
    const user = await this.hospitalrepository.findOne({where:{id:userid}})
    if (!user){
        throw new HttpException(`the user with user id ${userid} is not found`,HttpStatus.NOT_FOUND)
    }
    const updateuser= await this.hospitalrepository.update(userid,updatehospitaldto)
    if (!updateuser){
        throw new HttpException(`user refused to update, please check for the cause of error`, HttpStatus.BAD_REQUEST)

    }
    return user
}


//pharmacy crud

async getallpharmacy(userid:string):Promise<Pharmacy[]>{
    return await this.pharmacyrepository.find({where:{id:userid}})
}

async getallpharmacybyname(userid:string,pharmacy_name:string):Promise<Pharmacy>{
    return await this.pharmacyrepository.findOne({where:{id:userid,pharmacy_name:pharmacy_name}})
}

async findpharmacybystate(userid:string,state):Promise<Pharmacy>{
    return await this.pharmacyrepository.findOne({where:{id:userid,state:state}})
}
async findpharmacybycountry(userid:string,country):Promise<Pharmacy>{
    return await this.pharmacyrepository.findOne({where:{id:userid,country:country}})

}

async findpharmacybyRcnumber(userid:string,RC_number):Promise<Pharmacy>{
    return await this.pharmacyrepository.findOne({where:{id:userid,RC_number:RC_number}})
    
}


async deletePharmacy(userid:string){
    const user  = await this.pharmacyrepository.delete(userid)
    if (!user.affected){
        throw new HttpException(`the patient with id ${userid} is not found `,HttpStatus.NOT_FOUND)

    }
    return HttpStatus.NO_CONTENT
}

async updatepharmacy(updatepharmacydto:PharmacyUpdateDto, userid:string){
    const user = await this.hospitalrepository.findOne({where:{id:userid}})
    if (!user){
        throw new HttpException(`the user with user id ${userid} is not found`,HttpStatus.NOT_FOUND)
    }
    const updateuser= await this.hospitalrepository.update(userid,updatepharmacydto)
    if (!updateuser){
        throw new HttpException(`user refused to update, please check for the cause of error`, HttpStatus.BAD_REQUEST)

    }
    return user
}


//crud for the laboratory

async getalllab(userid:string):Promise<Laboratory[]>{
    return await this.laboratoryrepository.find({where:{id:userid}})
}

async getalllabbyname(userid:string,laboratory_name:string):Promise<Laboratory>{
    return await this.laboratoryrepository.findOne({where:{id:userid,laboratory_name:laboratory_name}})
}

async findlabbystate(userid:string,state):Promise<Laboratory>{
    return await this.laboratoryrepository.findOne({where:{id:userid,state:state}})
}
async findlabbycountry(userid:string,country):Promise<Laboratory>{
    return await this.laboratoryrepository.findOne({where:{id:userid,country:country}})

}

async findlabbyRcnumber(userid:string,RC_number):Promise<Laboratory>{
    return await this.laboratoryrepository.findOne({where:{id:userid,RC_number:RC_number}})
    
}


async deleteLab(userid:string){
    const user  = await this.laboratoryrepository.delete(userid)
    if (!user.affected){
        throw new HttpException(`the patient with id ${userid} is not found `,HttpStatus.NOT_FOUND)

    }
    return HttpStatus.NO_CONTENT
}

async updateLab(updatelabdto:LaboratoryUpdateDto, userid:string){
    const user = await this.laboratoryrepository.findOne({where:{id:userid}})
    if (!user){
        throw new HttpException(`the user with user id ${userid} is not found`,HttpStatus.NOT_FOUND)
    }
    const updateuser= await this.laboratoryrepository.update(userid,updatelabdto)
    if (!updateuser){
        throw new HttpException(`user refused to update, please check for the cause of error`, HttpStatus.BAD_REQUEST)

    }
    return user
}



}
