import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Hospital } from '../entities/hospital.entity';
import { Laboratory } from '../entities/laboratory.entity';
import { Pharmacy } from '../entities/pharmacy.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory{
    constructor (private configservice: ConfigService){

    }
    createTypeOrmOptions(): TypeOrmModuleOptions{
        return {
            
            type: "postgres",
            host:this.configservice.get('DATABASE_HOST'),
            port:this.configservice.get('DATABASE_PORT'),
            username:this.configservice.get('DATABASE_USERNAME'),
            password:this.configservice.get('DATABASE_PASSWORD'),
            database:this.configservice.get('DATABASE_NAME'),
            entities: [User,Hospital,Pharmacy,Laboratory],
            synchronize:true,
            logging:false,
            migrations:[],
        
            subscribers:[]
          }
        }

    }
