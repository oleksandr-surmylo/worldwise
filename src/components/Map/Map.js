import React, { useEffect, useState } from 'react';
import styles from './Map.module.css'
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
import { useCitiesContext } from "../../contexts/CitiesContext/CitiesContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../Button/Button";
import { useUrlPosition } from "../../hooks/useUrlPosition";

const Map = () => {
  const { cities } = useCitiesContext()
  const [ mapPosition, setMapPosition ] = useState( [ '50', '12' ] )
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition
  } = useGeolocation()

  const [ mapLat, mapLng ] = useUrlPosition()

  useEffect( () => {
    if ( mapLat && mapLng ) {
      setMapPosition( [ mapLat, mapLng ] )
    }
  }, [ mapLat, mapLng ] )

  useEffect( () => {
    if ( geolocationPosition ) {
      setMapPosition( [ geolocationPosition.lat, geolocationPosition.lng ] )

    }
  }, [ geolocationPosition ] )

  console.log(cities)

  return (
    <div className={ styles.mapContainer }>
      { !geolocationPosition && <Button
        onClick={ getPosition }
        type="position">
        { isLoadingPosition ? 'Loading...' : "Use your position" }
      </Button> }
      <MapContainer
        className={ styles.map }
        center={ mapPosition }
        zoom={ 13 }
        scrollWheelZoom={ true }>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { cities.map( city => (
          <Marker position={ [ city.position.lat, city.position.lng ] } key={ city.id }>
            <Popup>
              <img src={ city.emoji } style={ { width: '20px' } }
                   alt={ city.cityName }></img><span>{ city.cityName }</span>
            </Popup>
          </Marker>
        ) ) }
        <ChangeCenter position={ mapPosition }/>
        <DetectClick/>
      </MapContainer>
    </div>
  );
};

function ChangeCenter( { position } ) {
  const map = useMap();
  map.setView( position )
}

function DetectClick() {
  const navigate = useNavigate()

  useMapEvent( {
    click: e => {
      navigate( `form?lat=${ e.latlng.lat }&lng=${ e.latlng.lng }` )
    }
  } )
}

export default Map;