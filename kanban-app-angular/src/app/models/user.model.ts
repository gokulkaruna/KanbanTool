import { UserType } from "../enums/usertype.enums";

export class User {
    userId: string;
    email: string;
    name: string;
    password: string;
    userType: UserType;

}