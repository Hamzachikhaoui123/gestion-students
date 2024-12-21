import { Class } from "src/typeOrm/entites/Class";

export type userParams = {
    userName: string;
    email: string;
    password: string
}

export type classParams = {
    name: string
}
export type etudiantsParams = {
    username: string;
     email?: string;
     birthdate: number;
     updateAt:Date;
     createdAt:Date;
     classe
}