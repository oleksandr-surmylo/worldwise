import React, { MouseEvent } from 'react';
import styles from './CityItem.module.css'
import { Link } from "react-router-dom";
import { useCitiesContext } from "../../contexts/CitiesContext/CitiesContext";
import { Cities } from "../../contexts/CitiesContext/CitiesContextType";

type PropsCity = {
    city: Cities
}

const formatDate = ( date: Date ) => {
    return new Intl.DateTimeFormat ( 'en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    } ).format ( new Date ( date ) )
}

const CityItem = ( { city }: PropsCity ) => {
    const { currentCity, deleteCity } = useCitiesContext ()
    const { cityName, emoji, date, id, position } = city

    const HandleClick = ( e: MouseEvent ): void => {
        e.preventDefault ();
        deleteCity ( id )
    }

    return (
        <Link className={ `${ styles.cityItem } ${ id === currentCity.id ? styles[ 'cityItem--active' ] : '' }` }
              to={ `${ id }?lat=${ position.lat }&lng=${ position.lng }` }>
            <img className={ styles.emoji } src={ emoji } alt={ cityName }></img>
            <h3 className={ styles.name }>{ cityName }</h3>
            <time className={ styles.date }>{ formatDate ( date ) }</time>
            <button className={ styles.deleteBtn } onClick={ HandleClick }>&times;</button>
        </Link>
    );
};

export default CityItem;