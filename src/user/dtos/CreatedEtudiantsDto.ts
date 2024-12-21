import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Class } from "src/typeOrm/entites/Class";

export class CreatedEtudiantsDto {
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
