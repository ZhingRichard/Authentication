import { Base } from './baseEntity';
import { gender } from './enum/gender.enum';
export declare class User extends Base {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: gender;
}
