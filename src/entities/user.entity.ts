import { Column, Entity } from 'typeorm';
import { SharedEndtity } from '../models/sharedEntity';

export enum vendorName {
  HOSPITALL = 'hospital',
  PHHARMACY = 'pharmacy',
  LABORATORY = 'laboratory',
}

export enum userRole {
  ADMIN = 'admin',
  VENDOR = 'vendor',
  PATIENT = 'patient',
}

@Entity()
export class User extends SharedEndtity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, length: 11 })
  phone: string;

  @Column({ unique: true })
  password: string;




    @Column({type:'enum',enum:vendorName, nullable:true})
    vendor:vendorName




    @Column({nullable:true})
    firstName: string

    @Column({nullable:true})
    middleName: string

    @Column({nullable:true})
    lastName: string

    @Column({nullable:true})
    address:string

    @Column({nullable:true})
    country:string


    @Column({nullable:true})
    gender:string

    @Column({nullable:true})
    stateOfResidence:string


    @Column({nullable:true})
    medical_history:string

    
   @Column({ type: 'enum', enum: userRole, default: userRole.PATIENT, nullable: true })
    role:userRole;

   


    
 

    
  

}


