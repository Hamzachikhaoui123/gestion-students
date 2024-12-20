import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Calendrier')
export class Calendrier {
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;
    @Column()
    username:string;
    @Column()
    startDate:number;
    @Column()
    finDate:number
}
