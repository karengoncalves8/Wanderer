export interface PlaceSearchAPI {
    place: string;
    place_id: string;
    structuredFormat: {
        mainText: {
            matches: {
                offset: number;
                length: number;
                value: string;
            }[];
            text: string;
        };
        secondaryText: {
            matches: {
                offset: number;
                length: number;
                value: string;
            }[];
            text: string;
        };
    };
    text: {
        matches: {
            offset: number;
            length: number;
            value: string;
        }[];
        text: string;
    };
    types: string[];
    details: {
        addressComponents: {
            longName: string;
            shortName: string;
            types: string[];
        }[];
        photos: {
            height: number;
            htmlAttributions: string[];
            photoReference: string;
            width: number;
        }[];
    };
}
