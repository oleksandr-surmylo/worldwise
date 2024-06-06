import React from 'react';
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import styles from "../CityList/CityList.module.css";
import CountryItem from "../CountryItem/CountryItem";
import { useCitiesContext } from "../../contexts/CitiesContext/CitiesContext";

type Countries = {
    country: string
    emoji: string
}

const text = "Add your first country by clicking on a city on the map"

const CountryList = () => {
    const { cities, isLoading } = useCitiesContext ()

    if ( isLoading ) return <Spinner/>

    if ( !cities.length ) return <Message message={ text }/>

    const countries = cities.reduce ( ( arr: Countries[], city ) =>
        !arr.map ( ( el ) => el.country ).includes ( city.country )
            ? [ ...arr, { country: city.country, emoji: city.emoji, id: city.id } ]
            : arr, [] );

    console.log ( countries )

    return (
        <ul className={ styles.cityList }>
            { countries.map ( ( countryObj: any ) => (
                <CountryItem countryObj={ countryObj } key={ countryObj.id }/>
            ) ) }
        </ul>
    );
};

export default CountryList;