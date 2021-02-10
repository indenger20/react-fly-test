import { IRequestPagination } from 'interfaces';

interface IRequest<T> {
  data: T;
  pagination: IRequestPagination;
}

export interface IFlightResponse extends IRequest<IFlightData[]> {}
export interface IAirportResponse extends IRequest<IFlightData[]> {}

export interface IFlightData {
  flight_date: string;
  flight_status:
    | 'scheduled'
    | 'active'
    | 'landed'
    | 'cancelled'
    | 'incident'
    | 'diverted';
  departure: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string;
    gate: string;
    delay: number;
    scheduled: string;
    estimated: string;
    actual: string;
    estimated_runway: string;
    actual_runway: string;
  };
  arrival: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string;
    gate: string;
    baggage: string;
    delay: number;
    scheduled: string;
    estimated: string;
    actual: null;
    estimated_runway: null;
    actual_runway: null;
  };
  airline: {
    name: string;
    iata: string;
    icao: string;
  };
  flight: {
    number: string;
    iata: string;
    icao: string;
    codeshared: null;
  };
  aircraft: {
    registration: string;
    iata: string;
    icao: string;
    icao24: string;
  };
  live: {
    updated: string;
    latitude: number;
    longitude: number;
    altitude: number;
    direction: number;
    speed_horizontal: number;
    speed_vertical: number;
    is_ground: boolean;
  };
}

export interface ICountry {
  iata: string;
  country: {
    iso: string;
    name: string;
  };
}
