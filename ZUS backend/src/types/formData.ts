export interface FormData {
    pesel: string;
    data: string;
    name: string;
    surname: string;
    phoneNumber: string;
    address: AddresType;
}

export interface AddresType {
    street?: string;
    country?: string;
    city?: string;
    postalCode?: string;
    buildingNumber?: string;

}







