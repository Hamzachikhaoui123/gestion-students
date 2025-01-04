import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expose } from "class-transformer";
import { Etudiant } from "./Etudiant";

@Entity({name:'class'})
export class Class {
    @PrimaryGeneratedColumn({type:'bigint'})
    id:string;
    @Column()
    name:string
    @OneToMany(()=>Etudiant,(etudiants)=>etudiants.classe)
    etudiants:Etudiant[]
       @Expose()
    get  numberOfEtudiants():number{
       return this.etudiants?.length || 0

    }
}