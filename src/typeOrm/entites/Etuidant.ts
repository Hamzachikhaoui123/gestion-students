import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Class } from "./Class";
import { Expose } from "class-transformer";
import { ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";
@Entity({name:'etuidant'})

export class Etuidant extends User{
    @Column()
    birthdate:number;
    @ManyToOne(()=>Class,(classe)=>classe.etuidants)
    @JoinColumn()
    classe :Class 
    @Column()
    updateAt:Date
    @Expose()

    get age(): { years: number, months: number, days: number } {
        const birthDateObj = new Date(this.birthdate);
        const currentDate = new Date();
    
        let years = currentDate.getFullYear() - birthDateObj.getFullYear();
        let months = currentDate.getMonth() - birthDateObj.getMonth();
        let days = currentDate.getDate() - birthDateObj.getDate();
    
        // If birth month is after current month or birth day is after current day
        if (months < 0 || (months === 0 && days < 0)) {
          years--;
          months += 12;
        }
    
        // Adjust months and days if days are negative
        if (days < 0) {
          months--;
          const tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
          days += tempDate.getDate();
        }
    
        return { years, months, days };
      }

}