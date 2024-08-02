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
    externalLinkInfo: {},
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
    membershipStatus:string
}

export interface CountryDTO{
    countryId: number;
    countryName: string;
    dialCode: string;
}
export interface DistrictDTO{
    districtId: number;
    countryId: number;
    districtName: string;
}