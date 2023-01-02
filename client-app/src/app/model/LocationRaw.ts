export interface LocationRaw {
    x: number;
    y: number;
    label: string;
    bounds: [number[], number[]],
    raw: LocationIQResponse;
}

export interface LocationIQResponse {
    place_id: string,
    osm_type: string,
    osm_id: string,
    licence: string,
    lat: string,
    lon: string,
    display_name: string,
    boundingbox: string[],
    importance: 0.25,
    address: LocationIQAddress;
}

export interface LocationIQAddress {
    name: string;
    house_number: string;
    road: string;
    neighbourhood: string;
    suburb: string;
    island: string;
    city: string;
    county: string;
    state: string;
    state_code: string;
    postcode: string;
    country: string;
    country_code: string;
}