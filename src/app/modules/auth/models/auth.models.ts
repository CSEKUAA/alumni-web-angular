export interface RegistrationDTO{
    roll: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
}

export interface LoginDTO{
    identifier:string;
    password:string;
    loginType:string;
}