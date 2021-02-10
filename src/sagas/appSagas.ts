import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getCountriesAction,
  getFlightsAction,
  selectAirportAction,
} from 'actions';
import { GET_COUNTRIES, GET_FLIGHTS } from 'const';
import {
  makeAction,
  httpApi,
  encodeDataToUrl,
  HttpResp,
  getAirportIata,
} from 'helpers';
import { ICountry, IFlightResponse } from 'interfaces';
import {
  AIR_PORT_PUBLIC_KEY,
  AIR_PORT_SECRET_KEY,
  FLIGHT_ACCESS_KEY,
} from 'config';
import { single } from 'air-port-codes-node';

const apcm = single({
  key: AIR_PORT_PUBLIC_KEY,
  secret: AIR_PORT_SECRET_KEY,
});

const getCountriesByIata = (payload: string[]): Promise<ICountry[]> => {
  const airports: ICountry[] = [];

  return new Promise((resolve, reject) => {
    const updateAirportsArray = (airport: any | null) => {
      if (airports.length < payload.length) {
        airports.push({
          country: airport?.country,
          iata: airport?.iata,
        });
      }
      if (airports.length === payload.length) {
        resolve(airports);
      }
    };

    apcm.onSuccess = (data: any) => {
      updateAirportsArray(data.airport);
    };

    apcm.onError = (data: any) => {
      updateAirportsArray({});
    };

    for (let i = 0; i < payload.length; i += 1) {
      apcm.request(payload[i]);
    }
  });
};

function* getFlights({
  payload,
  params: reqParams,
}: ReturnType<typeof getFlightsAction>) {
  try {
    const params = {
      ...payload,
      flight_status: 'scheduled',
    };
    // reset selected airport
    yield put(selectAirportAction(''));

    const res: HttpResp<IFlightResponse> = yield call(httpApi, {
      metod: 'GET',
      partUrl: `/flights?${encodeDataToUrl(
        params,
        false,
      )}&access_key=${FLIGHT_ACCESS_KEY}`,
      signal: reqParams?.signal,
    });

    if (res.data) {
      const airportIata = getAirportIata(res.data);
      yield put(getCountriesAction(airportIata));

      yield put(makeAction(GET_FLIGHTS.SUCCESS, res.data));
    }
  } catch (err) {
    console.log(err);
    yield put(makeAction(GET_FLIGHTS.FAILURE));
  }
}

function* getCountries({
  payload,
  params: reqParams,
}: ReturnType<typeof getCountriesAction>) {
  try {
    const countries = yield call(getCountriesByIata, payload);

    yield put(makeAction(GET_COUNTRIES.SUCCESS, countries));
  } catch (err) {
    console.log(err);
    yield put(makeAction(GET_COUNTRIES.FAILURE));
  }
}

export function* appSaga() {
  yield takeLatest(GET_FLIGHTS.PENDING, getFlights);
  yield takeLatest(GET_COUNTRIES.PENDING, getCountries);
}
