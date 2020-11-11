
    export interface GeoCode {
        latitude: number;
        longitude: number;
    }

    export interface Address {
        cityName: string;
        cityCode: string;
        countryName: string;
        countryCode: string;
        regionCode: string;
    }

    export interface Travelers {
        score: number;
    }

    export interface Analytics {
        travelers: Travelers;
    }

    export interface Airports {
        type: string;
        subType: string;
        name: string;
        detailedName: string;
        timeZoneOffset: string;
        iataCode: string;
        geoCode: GeoCode;
        address: Address;
        analytics: Analytics;
    }