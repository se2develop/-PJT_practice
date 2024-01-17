import React, { Fragment } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '1200px',
  height: '650px'
};

const center = {
  lat: 37.5012647456244,
  lng: 127.03958123605
};

const locations = [
  {lat: 37.5012647456244, lng: 127.03958123605},
  {lat: 37.498095, lng: 127.027610}
]



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

const searchBox = new google.maps.places.SearchBox(input);

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey : import.meta.env.VITE_GOOGLEMAP_API_KEY,
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <Fragment>
      <h1>Google Map</h1>
      <hr />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ disableDefaultUI: true, styles: myStyles, options}}
      >
         <MarkerF position={center} />
      </GoogleMap>
    </Fragment>
  ) : null
}

export default React.memo(MyComponent)