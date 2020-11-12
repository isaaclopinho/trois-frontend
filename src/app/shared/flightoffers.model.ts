
    export interface Aircraft {
        code: number;
    }

    export interface Arrival {
        at: Date;
        iataCode: string;
        terminal: number;
    }

    export interface Departure {
        at: Date;
        iataCode: string;
        terminal: number;
    }

    export interface Operating {
        carrierCode: string;
    }

    export interface Segment {
        aircraft: Aircraft;
        arrival: Arrival;
        blacklistedInEU: boolean;
        carrierCode: string;
        departure: Departure;
        duration: string;
        id: number;
        number: number;
        numberOfStops: number;
        operating: Operating;
    }

    export interface Itinerary {
        duration: string;
        segments: Segment[];
    }

    export interface Fee {
        amount: number;
        type: string;
    }

    export interface Price {
        base: number;
        currency: string;
        fees: Fee[];
        grandTotal: number;
        total: number;
    }

    export interface PricingOptions {
        fareType: string;
        includedCheckedBagsOnly: boolean;
    }

    export interface FlightOffer {
        id: number;
        instantTicketingRequired: boolean;
        itineraries: Itinerary[];
        lastTicketingDate: string;
        nonHomogeneous: boolean;
        numberOfBookableSeats: number;
        oneWay: boolean;
        paymentCardRequired: boolean;
        price: Price;
        pricingOptions: PricingOptions;
        source: string;
        travelerPricings: string;
        type: string;
        validatingAirlineCodes: string;
    }

    export interface Dictionaries {
    }

    export interface FlightOffers {
        data: FlightOffer[];
        dictionaries: Dictionaries;
    }

