import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Class } from "src/typeOrm/entites/Class";

export class CreatedEtudiantsDto {
   @IsString()
    userName: string;
    @IsNotEmpty()
    email: string;
    birthdate: number;
       
}
