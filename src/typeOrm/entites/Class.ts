import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Etuidant } from "./Etuidant";

@Entity({name:'class'})
export class Class {
    @PrimaryGeneratedColumn({type:'bigint'})
    id:string;
    @Column()
    name:string
    @OneToMany(()=>Etuidant,(etuidant)=>etuidant.classe)
    etuidants:Etuidant[]
}