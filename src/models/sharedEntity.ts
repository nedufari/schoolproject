import { BeforeUpdate, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


//entityies  ost like;y to appear in various tables 
export abstract class SharedEndtity {
    @PrimaryGeneratedColumn('uuid')
    id :string

    @Column({type:"timestamp with time zone",default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date

    @Column({nullable:true})
    creadtedBy?:string

    @Column({nullable:true,type:'timestamp with time zone'})
    updatedAt?:Date

    @Column({nullable:true})
    updatedBy?:string

    @Column({nullable:true, type:'timestamp with time zone' })
    @DeleteDateColumn()
    deletedAt?:Date

    @Column({nullable:true})
    deletedBy?:string


    @BeforeUpdate()
    updateDates(){
        this.updatedAt =new Date()
    }

}

