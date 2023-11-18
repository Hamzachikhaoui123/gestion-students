import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "./User";
import { Class } from "./Class";
@Entity({name:'etuidant'})
export class Etuidant extends User{
    @Column()
    birthdate:number;
    @ManyToOne(()=>Class,(classe)=>classe.etuidants)
    classe :Class 
    @Column()
    updateAt:Date

}