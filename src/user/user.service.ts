import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RckgAppResponse } from 'rckg-shared-library';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateNewUserDto, LoginDto } from '../auth/authdto';
import { Hospital } from '../entities/hospital.entity';
import { Laboratory } from '../entities/laboratory.entity';
import { Pharmacy } from '../entities/pharmacy.entity';
import { User, userRole, vendorName } from '../entities/user.entity';
import { TokenService } from './token.service';
import {
  CreateUserDto,
  CurrentUserResponseDto,
  HospitalCreateDto,
  LaboratoryCreateDto,
  PharmacyCreateDto,
} from './userdto';
import { UserRepository } from './userRepository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userepository: Repository<User>,
    @InjectRepository(Hospital)
    private readonly hospitalrepository: Repository<Hospital>,
    @InjectRepository(Pharmacy)
    private readonly pharmacyrepository: Repository<Pharmacy>,
    @InjectRepository(Laboratory)
    private readonly laboratoryrepository: Repository<Laboratory>,
    private tokenservice: TokenService,
  ) {}

  async me(userid: string): Promise<CurrentUserResponseDto> {
    const finduser = await this.userepository.findOne({
      where: [{ id: userid }],
      select: ['id', 'email', 'role', 'vendor'],
    });
    if (!finduser) {
      throw new HttpException('message', HttpStatus.NOT_FOUND);
    }

    return finduser;
  }

  async Signup(signupdto: CreateUserDto) {
    const { email, password, role } = signupdto;
    switch (role) {
      case userRole.PATIENT:
        await this.patient(signupdto);
        break;

      case userRole.VENDOR:
        const user = new User();
        user.email = email;
        user.password = await this.tokenservice.hashpassword(password);
        user.role = userRole.VENDOR;

        const createuser = await this.userepository.save(user);
        if (createuser) {
          this.vendors(createuser, signupdto);
        }
        break;

      default:
        break;
    }
  }

  //function to check the email before registering he user
  async checkuserbymail(email: string): Promise<boolean> {
    const user = await this.userepository.findOne({
      where: { email: email },
      select: ['id', 'email'],
    });
    if (!user) {
      return true;
    } else false;
  }

  async patient(createuserdto: CreateUserDto) {
    const { email, password, role } = createuserdto;
    const existingUser = await this.checkuserbymail(email);
    if (!existingUser) {
      throw new HttpException('message', HttpStatus.FORBIDDEN);
    }
    const user = new User();
    user.email = createuserdto.email;
    user.password = await this.tokenservice.hashpassword(
      createuserdto.password,
    );
    user.role = userRole.PATIENT;
    return await this.userepository.save(user);
  }

  private async vendors(vendor: User, signupdto: CreateUserDto) {
    switch (vendor.vendor) {
      case vendorName.HOSPITALL:
        const hospital = new Hospital();
        hospital.RC_number = signupdto.hopsitaldto.RC_number;
        hospital.hospital_name = signupdto.hopsitaldto.hospital_name;
        hospital.location = signupdto.hopsitaldto.location;
        hospital.country = signupdto.hopsitaldto.country;
        hospital.website = signupdto.hopsitaldto.website;
        hospital.email = signupdto.hopsitaldto.email;
        hospital.phone1 = signupdto.hopsitaldto.phone1;
        hospital.bio = signupdto.hopsitaldto.bio;
        hospital.specializations = signupdto.hopsitaldto.specializations;
        hospital.testimonies = signupdto.hopsitaldto.testimonies;
        hospital.password = await this.tokenservice.hashpassword(
          signupdto.hopsitaldto.password,
        );
        hospital.vendorename = vendorName.HOSPITALL;

        return await this.hospitalrepository.save(hospital);

        break;

      case vendorName.LABORATORY:
        const lab = new Laboratory();
        lab.RC_number = signupdto.labdto.RC_number;
        lab.email = signupdto.labdto.email;
        lab.laboratory_name = signupdto.labdto.laboratory_name;
        lab.country = signupdto.labdto.country;
        lab.website = signupdto.labdto.website;
        lab.bio = signupdto.labdto.bio;
        lab.state = signupdto.labdto.state;
        lab.phone1 = signupdto.labdto.phone1;
        lab.location = signupdto.labdto.location;
        lab.vendorename = vendorName.LABORATORY;
        return await this.laboratoryrepository.save(lab);
        break;

      case vendorName.PHHARMACY:
        const pharma = new Pharmacy();
        pharma.RC_number = signupdto.pharmadto.RC_number;
        pharma.email = signupdto.pharmadto.email;
        pharma.password = await this.tokenservice.hashpassword(
          signupdto.pharmadto.password,
        );
        pharma.website = signupdto.pharmadto.website;
        pharma.phone1 = signupdto.pharmadto.phone1;
        pharma.state = signupdto.pharmadto.state;
        pharma.breakthrough = signupdto.pharmadto.breakthrough;
        pharma.testimonies = signupdto.pharmadto.testimonies;
        pharma.bio = signupdto.pharmadto.bio;
        pharma.pharmacy_name = signupdto.pharmadto.pharmacy_name;
        pharma.location = signupdto.pharmadto.location;
        lab.vendorename = vendorName.LABORATORY;
        return this.pharmacyrepository.save(pharma);

      default:
        break;
    }
  }
}
