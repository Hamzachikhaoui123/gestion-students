import { IsOptional } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class User{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;
    @Column()
    username?:string;
    @Column({unique:true})
    email?:string
    @Column({ nullable: true, default: 'defaultPassword' })
    @IsOptional()
    password?: string;
    
    @Column()
    createdAt?:Date;

    



}