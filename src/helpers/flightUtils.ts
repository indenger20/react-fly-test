import * as go from 'gojs';
import { ICountry, IFlightData } from 'interfaces';
import { countries } from 'country-flags-svg';

const flags = countries;

const unknownAirport = 'Unknown Airport';

export const getAirportIata = (data: IFlightData[]) => {
  const airportNames: string[] = [];
  for (let i = 0; i < data.length; i += 1) {
    const currItem = data[i];
    if (!airportNames.find((n) => n === currItem.departure.iata)) {
      airportNames.push(currItem.departure.iata);
    }
    if (!airportNames.find((n) => n === currItem.arrival.iata)) {
      airportNames.push(currItem.arrival.iata);
    }
  }
  return airportNames;
};

const getFlag = ({
  iata,
  countries,
}: {
  iata: string;
  countries: ICountry[];
}) => {
  const country = countries.find((c) => c.iata === iata);
  const flag = flags.find(
    (f) => f.iso2 === country?.country.iso || f.iso3 === country?.country.iso,
  );
  return flag?.flag;
};

export const prepareNodeArray = (
  data: IFlightData[],
  countries: ICountry[],
): { nodeDataArray: go.ObjectData[]; linkDataArray: go.ObjectData[] } => {
  const nodeDataArray: go.ObjectData[] = [];
  const linkDataArray: go.ObjectData[] = [];

  for (let i = 0; i < data.length; i += 1) {
    const currItem = data[i];
    linkDataArray.push({
      idx: i,
      from: currItem.departure.airport || unknownAirport,
      to: currItem.arrival.airport || unknownAirport,
    });
  }

  for (let i = 0; i < linkDataArray.length; i += 1) {
    const currItem = linkDataArray[i];
    if (!nodeDataArray.find((n) => n.key === currItem.from)) {
      nodeDataArray.push({
        key: currItem.from,
        text: currItem.from,
        source: getFlag({
          countries,
          iata: data[currItem.idx].departure.iata,
        }),
      });
    }
    if (!nodeDataArray.find((n) => n.key === currItem.to)) {
      nodeDataArray.push({
        key: currItem.to,
        text: currItem.to,
        source: getFlag({
          countries,
          iata: data[currItem.idx].arrival.iata,
        }),
      });
    }
  }

  return { linkDataArray, nodeDataArray };
};

export const getSelectedFlights = (
  flights: IFlightData[],
  selectedAirport: string,
) => {
  return flights.filter((f) => f.departure.airport === selectedAirport);
};
