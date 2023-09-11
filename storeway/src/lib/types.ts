export interface Store {
    address: string,
    email: string,
    fax: string,
    id: number,
    name: string
    openingHours: OpeningHours,
    phone: string,
    position: Position,
    website: string,
    logo: string
}

interface OpeningHours {
    monday: string,
    tuesday: string,
    wednesday: string, 
    thursday: string, 
    friday: string,
    saturday?: string,
    sunday?: string
}

export interface Position {
    lat: string,
    lng: string,
}

export interface IDropdownStore {
    label: string,
    value: string
}

export interface IDropdownCity {
    label: string,
    value: Position
}