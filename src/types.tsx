export interface IData {
    PersonID:string;
    firstName: string;
    lastName: string;
    age: string;
    email: string;
    gender: string;
    phone: string;
    tshirt: string;
    team: string;
    licenseCard: '';
    hopes: string; 
    freeText: string;
}

export interface IDataIndex {
    index: number;
    data: IData;
    update: boolean;
}

export interface IDataBoolean {
    PersonID: boolean;
    firstName: boolean ;
    lastName: boolean;
    age:  boolean;
    email: boolean;
    gender: boolean;
    phone: boolean;
    tshirt: boolean;
    team:  boolean;
    licenseCard:  boolean;
    hopes: boolean; 
    freeText:  boolean;
}

export interface IAdmin {
    user: string;
    password: string;
}