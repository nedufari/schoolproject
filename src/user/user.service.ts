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
import { CreateUserDto, CurrentUserResponseDto, HospitalCreateDto, LaboratoryCreateDto, PharmacyCreateDto } from './userdto'
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



    async Signup(signupdto:CreateUserDto, hopsitaldto:HospitalCreateDto, labdto:LaboratoryCreateDto,pharmadto:PharmacyCreateDto){
        const {email, password,vendor,role} = signupdto;
        switch (role) {
            case userRole.PATIENT:
                await this.patient(signupdto)
            case userRole.VENDOR:
                if (vendorName.HOSPITALL){
                    
                }




                const user= new User();
                user.email=email
                user.password=await this.tokenservice.hashpassword(password)
                user.role=userRole.VENDOR

                const createuser= await this.userepository.save(user)
                if (createuser){
                    this.vendors(createuser,hopsitaldto,labdto,pharmadto)
                }

                    


                
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

    private async  vendors(vendor:User, hopsitaldto:HospitalCreateDto, labdto:LaboratoryCreateDto, pharmadto:PharmacyCreateDto){
        switch (vendor.vendor) {
            case vendorName.HOSPITALL:
                const hospital = new Hospital()
                hospital.RC_number= hopsitaldto.RC_number;
                hospital.hospital_name= hopsitaldto.hospital_name;
                hospital.location= hopsitaldto.location;
                hospital.country= hopsitaldto.country;
                hospital.website= hopsitaldto.website;
                hospital.email= hopsitaldto.email;
                hospital.phone1= hopsitaldto.phone1;
                hospital.bio= hopsitaldto.bio;
                hospital.specializations= hopsitaldto.specializations
                hospital.testimonies= hopsitaldto.testimonies
                hospital.password=  await this.tokenservice.hashpassword(hopsitaldto.password)
                hospital.role=userRole.VENDOR
                
                return await this.hospitalrepository.save(hospital)
                
                break;

            case vendorName.LABORATORY:
                const lab=  new Laboratory();
                lab.RC_number = labdto.RC_number;
                lab.email=labdto.email
                lab.password=await this.tokenservice.hashpassword(labdto.password)
                lab.laboratory_name=labdto.laboratory_name;
                lab.country=labdto.country;
                lab.website=labdto.website;
                lab.bio=labdto.bio;
                lab.state=labdto.state;
                lab.phone1=labdto.phone1;
                lab.location=labdto.location
                lab.role=userRole.VENDOR
                return await this.laboratoryrepository.save(lab)
                break;

            case vendorName.PHHARMACY:
                const pharma=new Pharmacy();
                pharma.RC_number=pharmadto.RC_number;
                pharma.email=pharmadto.email;
                pharma.password=await this.tokenservice.hashpassword(pharmadto.password);
                pharma.website=pharmadto.website;
                pharma.phone1=pharmadto.phone1;
                pharma.state=pharmadto.state;
                pharma.breakthrough=pharmadto.breakthrough;
                pharma.testimonies=pharmadto.testimonies
                pharma.bio=pharmadto.bio;
                pharma.pharmacy_name=pharmadto.pharmacy_name;
                pharma.location=pharmadto.location
                pharma.role=userRole.VENDOR
                return this.pharmacyrepository.save(pharma)
        
            default:
                break;
        }
    
    }

}
