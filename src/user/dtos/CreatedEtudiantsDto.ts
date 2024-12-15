import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Class } from "src/typeOrm/entites/Class";

export class CreatedEtudiantsDto {
   @IsString()
   @IsNotEmpty()

    userName: string;
    @IsNotEmpty()
    email: string;
    birthdate: number;
       
}
