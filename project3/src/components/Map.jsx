import { Fragment, useState, useMemo } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutocomplete";

function Map() {
  const containerStyle = {
    width: "700px",
    height: "550px",
  };

  const mapStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];
  const center = useMemo(() => ({ lat: 37.5012647456244, lng: 127.03958123605 }), []);
  const [selected, setSelected] = useState('');

  return (
    <Fragment>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

      <GoogleMap
        mapContainerClassName="map-container"
        mapContainerStyle={containerStyle}
        zoom={10}
        center={center}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
          options,
        }}
      >
        {selected && <MarkerF position={selected} />}
      </GoogleMap>
    </Fragment>
  );
}

export default Map;