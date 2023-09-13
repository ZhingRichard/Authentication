import { gender } from "src/entity/enum/gender.enum";

export class signUpDto{
    firstName: string;

    lastName: string;

    email: string;

    password: string;

    gender: gender;

}