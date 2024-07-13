export interface RegistrationDTO{
    roll: string;
    nickName: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    bloodGroup: string;
    dob: string
    disciplineId: number;
    isAgree: boolean;
}

export interface LoginDTO{
    identifier:string;
    password:string;
    loginType:string;
}