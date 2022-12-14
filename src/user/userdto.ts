//creating all the dto for all forms of crud activity needed by the user

import { OmitType, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';
import Email from 'rckg-shared-library/lib/notification/email/email';
import { userRole, vendorName } from '../entities/user.entity';



    
       



//dto for hopsital create
export class HospitalCreateDto {
  @IsString()
  @IsNotEmpty()
  hospital_name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  country: string;


  @IsString()
  @IsNotEmpty()
  website: string;

  @IsEmail()
  @IsNotEmpty()
  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    { message: 'invalid email' },
  )
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString()
  @IsNotEmpty()
  RC_number: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, {
    message: 'Password too weak, please try another',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  phone1: string;

  @IsString()
  phone2: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsString()
  @IsNotEmpty()
  specializations: string;

  @IsString()
  @IsNotEmpty()
  testimonies: string;
}

//dto for cratelaboratory

export class LaboratoryCreateDto {
  @IsString()
  @IsNotEmpty()
  laboratory_name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, {
    message: 'Password too weak, please try another',
  })
  password: string;

  @IsString()
  website: string;
      
    

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  phone1: string;

  @IsString()
  phone2: string;

  @IsString()
  @IsNotEmpty()
  RC_number: string;

  @IsString()
  @IsNotEmpty()
  bio: string;
}

export class PharmacyCreateDto {
  @IsString()
  @IsNotEmpty()
  pharmacy_name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  website: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  RC_number: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, {
    message: 'Password too weak, please try another',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  phone1: string;

  @IsString()
  phone2: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  breakthrough: string;

  @IsString()
  @IsNotEmpty()
  testimonies: string;
}

//create new user
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    { message: 'invalid email' },
  )
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, {
    message: 'Password too weak, please try another',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  vendor: vendorName;

  @IsString()
  @IsNotEmpty()
  role: userRole;

  @ValidateIf(
    (o) => o.role === userRole.VENDOR && o.vendor === vendorName.HOSPITALL,
  )
  @IsNotEmpty()
  @IsString()
  hopsitaldto: HospitalCreateDto;

  @ValidateIf(
    (o) => o.role === userRole.VENDOR && o.vendor === vendorName.LABORATORY,
  )
  @IsNotEmpty()
  @IsString()
  labdto: LaboratoryCreateDto;

  @ValidateIf(
    (o) => o.role === userRole.VENDOR && o.vendor === vendorName.PHHARMACY,
  )
  @IsNotEmpty()
  @IsString()
  pharmadto: PharmacyCreateDto;
}

//Updateuserdto



// for the user response
export class UserResponseDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsEmail()
  email: string;
}

// for user response with credentials
export class UserResponseWithCredentialsDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

// dto for the current userr response

export class CurrentUserResponseDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsEmail()
  email: string;
}

//dto for resetting password

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  resetPasswordToken: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, {
    message: 'password too weak',
  })
  newPassword: string;
}


//dto for pharmacyupdate
export class PharmacyUpdateDto {
  @IsString()
  @IsNotEmpty()
  pharmacy_name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  website: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  RC_number: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, {
    message: 'Password too weak, please try another',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  phone1: string;

  @IsString()
  phone2: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  breakthrough: string;

  @IsString()
  @IsNotEmpty()
  testimonies: string;
}

//dto for lab update

export class LaboratoryUpdateDto {
  @IsString()
  @IsNotEmpty()
  laboratory_name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, {
    message: 'Password too weak, please try another',
  })
  password: string;

  @IsString()
  website: string;
      
    

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  phone1: string;

  @IsString()
  phone2: string;

  @IsString()
  @IsNotEmpty()
  RC_number: string;

  @IsString()
  @IsNotEmpty()
  bio: string;
}

//chospital cupdate dto

export class HospitalUpdateDto {
  @IsString()
  @IsNotEmpty()
  hospital_name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  country: string;


  @IsString()
  @IsNotEmpty()
  website: string;

  @IsEmail()
  @IsNotEmpty()
  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    { message: 'invalid email' },
  )
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString()
  @IsNotEmpty()
  RC_number: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, {
    message: 'Password too weak, please try another',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  phone1: string;

  @IsString()
  phone2: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsString()
  @IsNotEmpty()
  specializations: string;

  @IsString()
  @IsNotEmpty()
  testimonies: string;
}



