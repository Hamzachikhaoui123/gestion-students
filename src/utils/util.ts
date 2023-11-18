import { Class } from "src/typeOrm/entites/Class";

export type userParams={
    userName:string;
    email:string;
    password:string
}

export type classParams={
    name:string
}
export type etudiantsParams={
 
    birthdate:number;
    classe:Class
}