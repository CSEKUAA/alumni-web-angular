export interface PagedAPIResponseDTO{
    content:any[];
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    first: boolean,
    numberOfElements: number,
    empty: boolean
}

export interface PagedResponseDTO{
    data:any[];
    pageinfo:PageinfoDTO;
}

export interface PageinfoDTO{
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    first: boolean,
    numberOfElements: number,
    empty: boolean
}