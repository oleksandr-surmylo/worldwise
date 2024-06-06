import React from 'react';
import styles from './CityList.module.css'
import Spinner from "../Spinner/Spinner";
import CityItem from "../CityItem/CityItem";
import Message from "../Message/Message";
import { useCitiesContext } from "../../contexts/CitiesContext/CitiesContext";
import { Cities } from "../../contexts/CitiesContext/CitiesContextType";

type PropsCities = {
    cities: Cities[]
    isLoading: boolean
}

const text = "Add your first city by clicking on a city on the map"

const CityList = () => {
    const { cities, isLoading }: PropsCities = useCitiesContext ()

    if ( isLoading ) return <Spinner/>

    if ( !cities.length ) return <Message message={ text }/>

    return (
        <ul className={ styles.cityList }>
            { cities.map ( city => (
                <CityItem key={ city.id } city={ city } />
            ) ) }
        </ul>
    );
};

export default CityList;