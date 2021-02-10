import { IActionFn } from 'interfaces';
import { GET_COUNTRIES, GET_FLIGHTS, SELECT_AIRPORT } from 'const';

export const getFlightsAction: IActionFn<{ limit: number }> = (
  payload,
  params,
) => ({
  payload,
  params,
  type: GET_FLIGHTS.PENDING,
});

export const getCountriesAction: IActionFn<string[]> = (payload, params) => ({
  payload,
  params,
  type: GET_COUNTRIES.PENDING,
});

export const selectAirportAction: IActionFn<string> = (payload) => ({
  payload,
  type: SELECT_AIRPORT,
});
