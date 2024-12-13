export interface PageRequestDTO{
    page:number;
    size:number;
    disciplineName:string;
}

export interface AlumniPageRequestDTO{
    page:number;
    size:number;
    disciplineName:string;
    batchCode:string;
    studentId:string;
    name:string;
}

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