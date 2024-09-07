export interface LoginResponseDTO{
    token: string;
    refreshToken: string;
    expireTime: string;
}

export interface UserProfileResponseDTO{
    roll: string,
    firstName: string,
    lastName: string,
    nickName: string,
    fullName: string,
    discipline: string,
    dob: string,
    bloodGroup: string,
    photo: string,
    contactDetail: ContactDetailsDTO,
    externalLinkInfo: AlumniExternalLinkInfoDTO[],
    membershipInfos: MembershipInfoDTO[]
}

export interface ContactDetailsDTO{
    phoneNumber: string,
    email: string,
    presentAddress: string,
    presentCity: string,
    presentCountry: string,
    permanentAddress: string,
    permanentCity: string,
    permanentCountry: string,
    profession: string,
    designation: string,
    company: string,
    companyAddress: string
}

export interface MembershipInfoDTO{
    memberShipType: string,
    expirationOn: Date,
    membershipStatus: string
}

export interface AlumniExternalLinkInfoDTO{
    alumniExternalLinkId: number;
    alumniExternalLinkName: string;
    alumniExternalLinkUrl: string;
    description: string;
}

export interface CountryDTO{
    countryName: string;
    countryCode: string;
}
export interface DistrictDTO{
    districtName: string;
    countryName: string;
}

export interface ExternalLinkTypeDTO{
    typeName: string;
    typeUrl: string;
}

export interface MembershipTypesDTO{
    memberShipTypeId:number;
    membershipType:string;
    membershipFee:string;
}

export interface PermissionsDTO{
    name: string;
    parentId:number;
    order:number;
    link:string;
    identifier:string;
}

export interface RoleWithPermissionDTO{
    role:string;
    permissions:PermissionsDTO[];
}

export interface EventTypesDTO{
    id:number;
    eventTypeName:string;
    eventTypeDescription:string;
}

export interface EventResponseDTO{
    eventId:number;
    eventName: string;
    eventType: string;
    description: string;
    eventDate: string;
    eventTime: string;
    location: string;
    link: string;
    createdDate: string;
    updatedDate: string;
}

export interface DisciplineDTO{
    disciplineCode: string;
    shortName: string;
    fullName: string;
}

export interface SkillResponseDTO{
    skillId:number;
    skillName:string;
}