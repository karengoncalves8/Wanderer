export interface VooAPISearch {
    iataOrigem: string;
    iataDestino: string;
    dataPartida: string;
    dataVolta?: string;
    idaEVolta: boolean;
    classe: number;
    usuarioPais: string;
    idioma: string;
}

export interface Voo {
  departure_airport: { id: string; time: string };
  arrival_airport: { id: string; time: string };
  duration: number;
  airline: string;
  airline_logo: string;
  travel_class: string;
  price: number;
  departure_token?: string;
  flight_number: string;
  booking_token?: string;
  booking_url?: string;
}