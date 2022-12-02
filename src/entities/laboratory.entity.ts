import { Column, Entity, JoinColumn } from "typeorm";
import { SharedEndtity } from "../models/sharedEntity";
import { User, userRole, vendorName } from "./user.entity";

@Entity()
export class Laboratory extends SharedEndtity{
    @Column({type:'text', unique:true, nullable:false})
    laboratory_name:string

    @Column()
    location:string

    @Column()
    country:string

    @Column()
    state:string

    @Column()
    website:string

    @Column()
    password:string

    @Column({type:"varchar", unique:true,nullable:false})
    email:string

    @Column({type:"varchar",unique:true, nullable:false})
    RC_number:string

    @Column()
    phone1:string

    @Column()
    phone2:string

    @Column({length:150})
    bio:string

    @Column({type:'enum',enum:userRole, default:userRole.VENDOR})
    role:userRole.VENDOR

    @Column({type:'enum',enum:vendorName, default:vendorName.LABORATORY})
    vendorename:vendorName.LABORATORY

    @JoinColumn()
    userid:User

}