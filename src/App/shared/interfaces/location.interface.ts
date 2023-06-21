export interface LocationsDTO {
    locations: LocationInfo[];
}

export interface LocationInfo {
    id: string;
    name: string;
    country: string;
    timezone: string;
    language: string;
    adminArea: string;
    adminArea2: string;
    adminArea3: string;
    lon: number;
    lat: number;
}