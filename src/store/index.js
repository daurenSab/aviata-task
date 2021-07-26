import {createStore} from 'vuex'
import results from "../task/results.json";

const airlineFilters = Object.keys(results.airlines).map(key => ({
    key,
    text: results.airlines[key],
    isChecked: true
}))

export default createStore({
    state: {
        airlineFilters,
        flights: results.flights,
        tariffFilters: [
            {
                text: 'Только прямые',
                key: 'direct',
                isChecked: false
            },
            {
                text: 'Только с багажом',
                key: 'baggage',
                isChecked: false
            },
            {
                text: 'Только возвратные',
                key: 'refundable',
                isChecked: false
            },
        ]
    },
    getters: {
        flights(state) {
            return state.flights
        },
        tariffFilters(state) {
            return state.tariffFilters
        },
        airlineFilters(state) {
            return state.airlineFilters
        }
    },
    mutations: {
        updateAirlineFilters(state, airlineFilters) {
            state.airlineFilters = airlineFilters
        },
        updateTariffFilters(state, tariffFilters) {
            state.tariffFilters = tariffFilters
        },
        resetAllFilters(state) {
            state.airlineFilters.forEach(filter => filter.isChecked = true)
            state.tariffFilters.forEach(filter => filter.isChecked = false)

            state.flights = results.flights
        },
        filterFlights(state) {
            const tariffs = state.tariffFilters.filter(tariff => tariff.isChecked)

            //filtering by airlines
            let flights = results.flights.filter(flight => {
                return flight.itineraries[0][0].segments.some(segment => {
                    return state.airlineFilters.some(airline => airline.key === segment.carrier && airline.isChecked)
                })
            })

            //filtering by tariffs
            tariffs.forEach(tariff => {
                switch (tariff.key) {
                    case 'baggage':
                        flights = flights.filter(flight => flight.itineraries[0][0].segments[0].baggage_options[0].value);
                        break;
                    case 'direct':
                        flights = flights.filter(flight => flight.itineraries[0][0].segments.length === 1);
                        break;
                    case 'refundable':
                        flights = flights.filter(flight => flight.refundable);
                        break;
                }
            })

            state.flights = flights
        },
    },
    actions: {},
    modules: {}
})
