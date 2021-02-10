import React from 'react';
import { useSelector } from 'react-redux';
import { IFlightData } from 'interfaces';
import { formatDate, getSelectedFlights, makeSelector } from 'helpers';

import './AirportInfo.scss';

function AirportInfo() {
  const selectedAirport = useSelector<any, string>(
    makeSelector(['appReducer', 'selectedAirport']),
  );
  const flights = useSelector<any, IFlightData[]>(
    makeSelector(['appReducer', 'flights']),
  );

  const flightsInfo = getSelectedFlights(flights, selectedAirport);

  return (
    <div className="airport-info">
      <ol>
        {flightsInfo.map((flight, i) => {
          return (
            <li key={i}>
              Flight from {flight.departure.airport} to {flight.arrival.airport}
              , sheduled for {formatDate(new Date(flight.arrival.scheduled))}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default AirportInfo;
