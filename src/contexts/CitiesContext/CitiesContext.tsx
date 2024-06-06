import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Cities, CitiesProviderProps, FetchAction, InitialContext, NewCity } from "./CitiesContextType";


const initialContextState: InitialContext = {
    cities: [],
    isLoading: false,
    getCity: () => {
    },
    error: "",
    currentCity: {} as Cities,
    createCity: () => {
    },
    deleteCity: () => {
    }
}

// export const BASE_URL = 'http://localhost:8000'
export const BASE_GET_URL = 'https://api.fakend.fyi/jrax2wr1HbmF45ObzCZu/ugFpxwiCFSDNlDgLIRTb'
export const BASE_POST_URL = 'https://api.fakend.fyi/jrax2wr1HbmF45ObzCZu/9363Rn2FoVPaUDMBfp4i'
export const BASE_URL = 'https://665389601c6af63f4674f61a.mockapi.io'

const CitiesContext = createContext ( initialContextState )

interface InitialState {
    cities: Cities[],
    isLoading: boolean,
    currentCity: Cities
    error: string
}

const initialState: InitialState = {
    cities: [],
    isLoading: false,
    currentCity: {} as Cities,
    error: ""
}


function reducer ( state: InitialState, action: FetchAction ): InitialState {
    switch ( action.type ) {
        case 'loading':
            return {
                ...state,
                isLoading: true
            }
        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            }
        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload
            }
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [ ...state.cities, action.payload ],
                // currentCity: action.payload,
            }
        case 'city/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter ( ( city ) => city.id !== action.payload ),
                // currentCity: {},
            } as InitialState
        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        default: {
            throw new Error ( "Unknown action type" );
        }
    }
}

const CitiesProvider = ( { children }: CitiesProviderProps ) => {
    const [ { cities, isLoading, currentCity, error }, dispatch ] = useReducer ( reducer, initialState )


    useEffect ( () => {
        dispatch ( { type: 'loading' } )
        const fetchCities = async () => {
            try {
                const response = await fetch ( `${ BASE_URL }/questions` )
                const data = await response.json ()
                dispatch ( { type: 'cities/loaded', payload: data } )
            } catch {
                dispatch ( { type: 'rejected', payload: "There was an error loading data..." } )
            }
        }
        fetchCities ()
    }, [] )

    async function getCity ( id: string ) {
        if ( id === currentCity.id ) return
        dispatch ( { type: 'loading' } )
        try {
            const response = await fetch ( `${ BASE_URL }/questions/${ id }` )
            const data = await response.json ()
            dispatch ( { type: 'city/loaded', payload: data } )
        } catch {
            dispatch ( { type: 'rejected', payload: "There was an error getting city" } )
        }
    }

    async function createCity ( newCity: NewCity ) {
        dispatch ( { type: 'loading' } )
        try {
            const response = await fetch ( `${ BASE_URL }/questions`, {
                method: 'POST',
                body: JSON.stringify ( newCity ),
                headers: {
                    'Content-Type': 'application/json',
                },
            } )
            const data = await response.json ()
            dispatch ( { type: 'city/created', payload: data } )
        } catch {
            dispatch ( { type: 'rejected', payload: "There was an error creating city" } )
        }
    }

    async function deleteCity ( id: string ) {
        dispatch ( { type: 'loading' } )
        try {
            await fetch ( `${ BASE_URL }/questions/${ id }`, {
                method: 'DELETE',
            } )
            dispatch ( { type: 'city/deleted', payload: id } )
        } catch {
            dispatch ( { type: 'rejected', payload: "There was an error deleting city" } )
        }
    }

    return (
        <CitiesContext.Provider value={ {
            cities,
            isLoading,
            currentCity,
            error,
            getCity,
            createCity,
            deleteCity
        } }>
            { children }
        </CitiesContext.Provider>
    );
};

const useCitiesContext = () => {
    const context = useContext ( CitiesContext )
    if ( !context ) {
        throw new Error (
            "context has to be used within <CurrentUserContext.Provider>"
        )
    }
    return context
}

export { CitiesProvider, useCitiesContext };
