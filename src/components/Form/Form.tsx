// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import React, { FormEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import BackButton from "../BackButton/BackButton";
import { useCitiesContext } from "../../contexts/CitiesContext/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji ( countryCode: any ) {
    const codePoints = countryCode
        .toUpperCase ()
        .split ( "" )
        .map ( ( char: any ) => 127397 + char.charCodeAt () );
    return String.fromCodePoint ( ...codePoints );
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form () {
    const [ lat, lng ] = useUrlPosition ()
    const navigate = useNavigate ()
    const { createCity, isLoading } = useCitiesContext ()

    const [ isLoadingGeocoding, setIsLoadingGeocoding ] = useState ( false )
    const [ cityName, setCityName ] = useState<string> ( "" );
    const [ country, setCountry ] = useState<string> ( "" );
    const [ date ] = useState<Date> ( new Date () );
    const [ notes, setNotes ] = useState<string> ( "" );
    const [ emoji, setEmoji ] = useState ( "" )
    const [ geocodingError, setGeocodingError ] = useState ( "" )
    const [ startDate, setStartDate ] = useState<Date | null> ( new Date () );


    useEffect ( () => {
        fetchCityData ()
    }, [ lat, lng ] )

    const fetchCityData = async () => {
        if ( !lat && !lng ) return
        try {
            setIsLoadingGeocoding ( true )
            setGeocodingError ( '' )
            const res = await fetch ( `${ BASE_URL }?latitude=${ lat }&longitude=${ lng }` )
            const data = await res.json ()
            if ( !data.countryCode ) {
                throw new Error (
                    "That doesn't seem to be a city. Click somewhere else 😉"
                )
            }
            setCityName ( data.city || data.locality || "" )
            setCountry ( data.countryName )
            setEmoji ( data.countryCode )
            // setEmoji ( convertToEmoji ( data.countryCode ) )
        } catch ( err ) {
            setGeocodingError ( ( err as Error ).message )
            alert ( 'There was an error fetching city data' )
        } finally {
            setIsLoadingGeocoding ( false )
        }
    }

    async function handleSubmit ( e: FormEvent<HTMLFormElement> ) {
        e.preventDefault ()
        if ( !cityName || !date ) return
        const newCity = {
            cityName,
            country,
            emoji: `https://flagcdn.com/${ emoji.toLowerCase() }.svg`,
            date,
            notes,
            position: { lat, lng }
        }
        await createCity ( newCity )
        navigate ( "/app/cities" )
    }

    if ( isLoadingGeocoding ) {
        return <Spinner/>;
    }

    if ( !lat && !lng ) {
        return <Message message='Start by clicking somewhere on the map'/>
    }

    if ( geocodingError ) {
        return <Message message={ geocodingError }/>
    }

    return (
        <form className={ `${ styles.form } ${ isLoading ? styles.loading : "" }` } onSubmit={ handleSubmit }>
            <div className={ styles.row }>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={ ( e ) => setCityName ( e.target.value ) }
                    value={ cityName }
                />
                <span className={ styles.flag }>{ emoji }</span>
            </div>

            <div className={ styles.row }>
                <label htmlFor="date">When did you go to { cityName }?</label>
                <DatePicker
                    id="date"
                    selected={ startDate }
                    onChange={ ( date ) => setStartDate ( date ) }
                    popperPlacement="bottom-start"
                    dateFormat='dd/MM/yyyy'
                />
            </div>

            <div className={ styles.row }>
                <label htmlFor="notes">Notes about your trip to { cityName }</label>
                <textarea
                    id="notes"
                    onChange={ ( e ) => setNotes ( e.target.value ) }
                    value={ notes }
                />
            </div>

            <div className={ styles.buttons }>
                <Button type='primary'>Add</Button>
                <BackButton/>
            </div>
        </form>
    )
        ;
}

export default Form;
