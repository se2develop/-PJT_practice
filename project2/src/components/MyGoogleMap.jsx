import React, { useState, useCallback, Fragment } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import Search from './Search';

const MyGoogleMap = (props)  => {
  const containerStyle = {
    width: '1200px',
    height: '650px'
  };
  
  const center = {
    lat: 37.5012647456244,
    lng: 127.03958123605
  };
  
  const options = {
    mimZoom : 4,
    maxZoom: 18,
  }
  
  const myStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ]; 

  const [locations, setLocations] = useState([
    { name:'명동', lat: 37.563576, lng:126.983431},
    { name:'가로수길', lat:37.520300, lng:127.023008},
    { name:'광화문', lat:37.575268, lng:126.976896},
    { name:'남산', lat:37.550925, lng:126.990945},
    { name:'이태원', lat:37.540223, lng:126.994005} 
  ]);

  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey : import.meta.env.VITE_GOOGLEMAP_API_KEY,
    libraries: ['places'],
  })

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, [center])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handlePlaceSelected = useCallback((place) => {
    const newMarkers = [...markers, { position: place, label: String(markers.length + 1) }];
    setMarkers(newMarkers);
  }, [markers]);

  return isLoaded ? (
    <Fragment>
      <h1>Google Map</h1>
      <Search map={map} onPlaceSelected={handlePlaceSelected} />
      <hr />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ libraries: "places", styles: myStyles, options}}
      >
  {markers.map((marker, index) => (
    <MarkerF
      key={index}
      label={marker.label}
      position={marker.position}
    />
  ))}
      </GoogleMap>
    </Fragment>
  ) : null
}

export default React.memo(MyGoogleMap)