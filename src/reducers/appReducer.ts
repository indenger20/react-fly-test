import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import { ICountry, IFlightData, IImmutableMap } from 'interfaces';
import { makeCombinedAction } from 'helpers';
import {
  GET_COUNTRIES,
  GET_FLIGHTS,
  SELECT_AIRPORT,
} from 'const/actionTypes/ActionTypes';

export interface AppReducerState {
  isLoading: boolean;
  flights: IFlightData[];
  selectedAirport: string;
  countries: ICountry[];
}

// tslint:disable-next-line:no-object-literal-type-assertion
const initialState = Immutable.fromJS({
  isLoading: false,
  flights: [],
  selectedAirport: '',
  countries: [],
} as AppReducerState);

const { PENDING, DONE, FAILURE } = makeCombinedAction(GET_COUNTRIES);

const appReducer = handleActions(
  {
    [`${PENDING}||${GET_FLIGHTS.PENDING}`]: (state) => {
      return state.set('isLoading', true);
    },
    [`${FAILURE}||${DONE}`]: (state) => {
      return state.set('isLoading', false);
    },

    [GET_FLIGHTS.SUCCESS]: (state, { payload }) => {
      return state.set('flights', Immutable.fromJS(payload));
    },
    [SELECT_AIRPORT]: (state, { payload }) => {
      return state.set('selectedAirport', payload);
    },
    [GET_COUNTRIES.SUCCESS]: (state, { payload }) => {
      return state.set('countries', Immutable.fromJS(payload));
    },
  },
  initialState,
);

export default appReducer;
