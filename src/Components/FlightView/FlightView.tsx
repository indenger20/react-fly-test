import React, { useRef, useState, useEffect } from 'react';
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import './FlightView.scss';
import { prepareNodeArray, makeSelector } from 'helpers';
import { useSelector, useDispatch } from 'react-redux';
import initDiagram from './initDiagram';
import { selectAirportAction, getFlightsAction } from 'actions';
import { LIMIT_FLIGHTS } from 'const';
import { ICountry, IFlightData } from 'interfaces';

function FlightView() {
  const dispatch = useDispatch();
  const controllerRef = useRef<AbortController | null>(null);

  const flights = useSelector<any, IFlightData[]>(
    makeSelector(['appReducer', 'flights']),
  );
  const countries = useSelector<any, ICountry[]>(
    makeSelector(['appReducer', 'countries']),
  );
  const isLoading = useSelector<any, boolean>(
    makeSelector(['appReducer', 'isLoading']),
  );

  const [limit, updateLimit] = useState(10);

  const handleChangeLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLimit(e.target.valueAsNumber);
  };

  const fetchFlights = () => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    dispatch(
      getFlightsAction({ limit }, { signal: controllerRef.current.signal }),
    );
  };

  useEffect(() => {
    fetchFlights();
  }, [limit]);

  const handleModelChange = (changes: go.IncrementalData) => {};

  const handleClick = (key: string) => {
    dispatch(selectAirportAction(key));
  };

  const { nodeDataArray, linkDataArray } = prepareNodeArray(flights, countries);

  const diagram = initDiagram(handleClick);

  return (
    <div className={`flight-view ${isLoading ? 'is-loading' : ''}`}>
      <div className="flight-view__diagram">
        {!isLoading ? (
          <ReactDiagram
            skipsDiagramUpdate={false}
            initDiagram={diagram}
            divClassName="diagram-component"
            nodeDataArray={nodeDataArray}
            linkDataArray={linkDataArray}
            onModelChange={handleModelChange}
          />
        ) : (
          <div className="loader" />
        )}
      </div>
      <form className="flight-view-form">
        <span className="flight-view-form__title">Max number of flights</span>
        <div className="flight-view-form__input">
          <input
            type="range"
            value={limit}
            onChange={handleChangeLimit}
            step={1}
            min={1}
            max={LIMIT_FLIGHTS}
          />
        </div>
        <div className="flight-view-form__bottom">
          <span>{limit}</span> <span>of</span> <span>{LIMIT_FLIGHTS}</span>
        </div>
      </form>
    </div>
  );
}

export default FlightView;
