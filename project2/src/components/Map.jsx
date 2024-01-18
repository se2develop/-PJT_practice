import React, { useState } from "react";
import GoogleMap from "google-map-react";
import SearchBox from "./SearchBox";

const Map = (props) => {
  const [apiReady, setApiReady] = useState(false);
  const [map, setMap] = useState(null);
  const [googlemaps, setGooglemaps] = useState(null);
  const [center, setCenter] = useState({ lat: 37.5, lng: 127 });
  let zoom = 10;

  if (window.screen.width >= 768) {
    zoom = 15;
  }

  const handleApiLoaded = (map, maps) => {
    if (map && maps) {
      setApiReady(true);
      setMap(map);
      setGooglemaps(maps);
    }
  };
  return (
    <div style={{ height: "650px" }}>
      {apiReady && googlemaps && <SearchBox mapApi={googlemaps} />}
      <div className="googleMap">
        <GoogleMap
          bootstrapURLKeys={{
            key: "AIzaSyAyxRcWvLITB6iDmq_PaSrZcLTt9Acv8kU",
            libraries: "places",
          }}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        ></GoogleMap>
      </div>
    </div>
  );
};

export default Map;