import { IsEmail } from "class-validator";
import { Class } from "src/typeOrm/entites/Class";

export class CreateEtudiants {
    userName: string;
    @IsEmail()
    email: string;
    birthdate: number;

    classe: Class
}
