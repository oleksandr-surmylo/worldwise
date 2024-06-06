import { ReactNode } from "react";

export type CitiesProviderProps = {
    children: ReactNode
}

export type InitialContext = {
    cities: Cities[],
    isLoading: boolean,
    getCity: ( id: string ) => void,
    error: string
    currentCity: Cities
    createCity: ( newCity: NewCity ) => void
    deleteCity: ( id: string ) => void
}

export type Cities = {
    cityName: string,
    country: string,
    emoji: string,
    date: Date,
    notes: string,
    position: {
        lat: number,
        lng: number
    },
    id: string
}

export type NewCity = {
    cityName: string
    country: string
    emoji: string
    date: Date
    notes: string
    position: {}
}

type FetchLoading = {
    type: 'loading'
}

type FetchCities = {
    type: 'cities/loaded'
    payload: Cities[]
}

type FetchCity = {
    type: 'city/loaded'
    payload: Cities
}

type FetchCityCreated = {
    type: 'city/created',
    payload: Cities,
}

type FetchDeleted = {
    type: 'city/deleted'
    payload: string
}

type Rejected = {
    type: 'rejected'
    payload: string
}

export type FetchAction = FetchLoading | FetchCities | FetchCity | FetchCityCreated | FetchDeleted | Rejected