import { Column, Entity } from "typeorm";
import { SharedEndtity } from "../models/sharedEntity";


export enum vendorName{
    HOSPITALL = 'hospital',
    PHHARMACY= 'pharmacy',
    LABORATORY= 'laboratory'
}

export enum userRole{
    ADMIN= 'admin',
    VENDOR= 'vendor',
    PATIENT= 'patient'
}



@Entity()
export class User extends SharedEndtity{

    @Column({unique:true})
    email:string

    @Column({nullable:true, length:11})
    phone:string

    @Column({unique:true})
    password:string

    @Column()
    vendor?:vendorName

   



    @Column()
    firstName: string

    @Column()
    middleName: string

    @Column()
    lastName: string

    @Column()
    address:string

    @Column()
    country:string

  

    @Column()
    gender:string

    @Column()
    stateOfResidence:string

   

    @Column()
    medical_history:string

    
   @Column({ type: 'enum', enum: userRole, default: userRole.PATIENT, nullable: true })
    role:userRole;

}