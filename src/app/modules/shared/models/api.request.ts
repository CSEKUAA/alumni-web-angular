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