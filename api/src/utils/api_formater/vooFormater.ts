import { Voo } from "../../interfaces/vooInterface";

export const formatVoos = (apiData: any): Voo[] => {
  const formatted: Voo[] = [];

    apiData.best_flights.forEach((bestFlight: any) => {
        bestFlight.flights.forEach((flight: any) => {
        formatted.push({
            departure_airport: {
            id: flight.departure_airport.id,
            time: flight.departure_airport.time
            },
            arrival_airport: {
            id: flight.arrival_airport.id,
            time: flight.arrival_airport.time
            },
            duration: flight.duration,
            airline: flight.airline,
            airline_logo: flight.airline_logo,
            travel_class: flight.travel_class,
            price: bestFlight.price, // preço total do pacote
            departure_token: bestFlight.departure_token ? bestFlight.departure_token : '',
            flight_number: flight.flight_number,
            booking_token: bestFlight.booking_token ? bestFlight.booking_token : ''
        });
        });
    });

    apiData.other_flights.forEach((bestFlight: any) => {
        bestFlight.flights.forEach((flight: any) => {
        formatted.push({
            departure_airport: {
            id: flight.departure_airport.id,
            time: flight.departure_airport.time
            },
            arrival_airport: {
            id: flight.arrival_airport.id,
            time: flight.arrival_airport.time
            },
            duration: flight.duration,
            airline: flight.airline,
            airline_logo: flight.airline_logo,
            travel_class: flight.travel_class,
            price: bestFlight.price, // preço total do pacote
            departure_token: bestFlight.departure_token ? bestFlight.departure_token : '',
            flight_number: flight.flight_number,
            booking_token: bestFlight.booking_token ? bestFlight.booking_token : ''
        });
        });
    });

  return formatted;
};