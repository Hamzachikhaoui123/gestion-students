import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException{
    constructor(id){
        super(`user by Id ${id} not found `,HttpStatus.NOT_FOUND)

    }
}