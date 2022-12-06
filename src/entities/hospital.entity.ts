import { Column, Entity, JoinColumn } from "typeorm";
import { SharedEndtity } from "../models/sharedEntity";
import { User, userRole, vendorName } from "./user.entity";

@Entity()
export class Hospital extends SharedEndtity{
    @Column({type:'text', unique:true, nullable:false})
    hospital_name:string

    @Column()
    state:string

    @Column()
    country:string

    @Column()
    website:string

    @Column({type:"varchar", unique:true,nullable:false})
    email:string

    @Column({nullable:false})
    password:string

    @Column({type:"varchar",unique:true, nullable:false})
    RC_number:string

    @Column()
    phone1:string

    @Column()
    phone2:string

    @Column({length:150})
    bio:string

    @Column({length:300})
    specializations:string

    @Column({length:300})
    testimonies:string

    @Column({type:'enum',enum:userRole, default:userRole.VENDOR})
    role:userRole.VENDOR

    @Column({type:'enum',enum:vendorName, default:vendorName.HOSPITALL})
    vendorename:vendorName.HOSPITALL

    @JoinColumn()
    userid:User

    

    


}