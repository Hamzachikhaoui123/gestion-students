import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateEtudiants {
    @IsString()
    username: string;
     @IsString()
     email?: string;
     @IsNumber()
     birthdate: number;
     updateAt:Date;
     createdAt:Date;
     classe

}