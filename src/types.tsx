export interface IData {
    id?:string;
    firstName: string;
    lastName: string;
    age: string;
    email: string;
    gender: string;
    phone: string;
    tshirt: string;
    team: string;
    licenseCard: boolean;
    hopes: string; 
    freeText: string;
}

export interface IAdmin {
    user: string;
    password: string;
}