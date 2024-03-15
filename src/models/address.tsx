export interface Address {
    city: string
    countryCode: string
    countryName: string
    county: string
    houseNumber: string
    label: string
    postalCode: string
    state: string
    stateCode: string
    street: string
  }
  
  export interface Category {
    id: string
    name: string
    primary: boolean
  }
  
  export interface Position {
    lat: number
    lng: number
  }