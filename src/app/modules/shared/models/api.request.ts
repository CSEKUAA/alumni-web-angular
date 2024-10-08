export interface UserProfileRequestDTO{
    roll: string;
    nickName: string;
    bloodGroup: string;
    dob: string;
    photo: string;
    presentAddress: string;
    presentCity: string;
    presentCountry: string;
    permanentAddress: string;
    permanentCity: string;
    permanentCountry: string;
    profession: string;
    designation: string;
    company: string;
    companyAddress: string;
}

export interface ExternalLinkCreateRequestDTO{
    externalLinkId:number;
    externalTypeName: string;
    externalLinkUrl: string;
    description: string;
}

export interface ExternalLinkUpdateRequestDTO{
    id: string;
    description: string;
    url: string;
}

export interface MembershipRequestDTO{
    membershipTypeId: number
}

export interface UpdatePasswordRequestDTO{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

// Events Request Models
export interface CreateEventRequestDTO{
    id:number;
    name:string;
    description:string;
    datetime:string; // it'll be a ISO datetime formate e.g 2024-08-15T13:10:00.000Z
    location:string;
    link:string;
}
//END