import styles from "./City.module.css";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import { useCitiesContext } from "../../contexts/CitiesContext/CitiesContext";
import Button from "../Button/Button";

const formatDate = ( date: Date | null ) => {
    if ( date ) {
        return new Intl.DateTimeFormat ( "en", {
            day: "numeric",
            month: "long",
            year: "numeric",
            weekday: "long",
        } ).format ( new Date ( date ) );
    }
}

function City () {
    const { id } = useParams ()
    const { getCity, currentCity, isLoading } = useCitiesContext ()

    console.log (id)

    useEffect ( () => {
        if ( id ) {
            getCity ( id )
        }
    }, [ id ] )


    const { cityName, emoji, date, notes } = currentCity;

    const navigate = useNavigate()

    return (
        <div className={ styles.city }>
            {
                isLoading
                    ?
                    <Spinner/>
                    :
                    <>
                        <div className={ styles.row }>
                            <h6>City name</h6>
                            <h3>
                                <img className='emoji' alt={ cityName } src={ emoji }></img>{ cityName }
                            </h3>
                        </div>

                        <div className={ styles.row }>
                            <h6>You went to { cityName } on</h6>
                            <p>{ formatDate ( date || null ) }</p>
                        </div>

                        { notes && (
                            <div className={ styles.row }>
                                <h6>Your notes</h6>
                                <p>{ notes }</p>
                            </div>
                        ) }

                        <div className={ styles.row }>
                            <h6>Learn more</h6>
                            <a
                                href={ `https://en.wikipedia.org/wiki/${ cityName }` }
                                target="_blank"
                                rel="noreferrer"
                            >
                                Check out { cityName } on Wikipedia &rarr;
                            </a>
                        </div>

                        <div>
                            <Button type='back' onClick={ () => navigate ( -1 ) }>&larr; Back</Button>
                        </div>
                    </>
            }

        </div>
    );
}

export default City;
