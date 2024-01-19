import React, { useState, useEffect, useCallback, Fragment } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import SearchBox from "./SearchBox";

const libraries = ["places"];

const MyGoogleMap = (props) => {
  const containerStyle = {
    width: "800px",
    height: "650px",
  };

  const center = {
    lat: 37.5012647456244,
    lng: 127.03958123605,
  };

  const options = {
    mimZoom: 4,
    maxZoom: 18,
  };

  const myStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];

  // 더미데이터
  // const [locations, setLocations] = useState([
  //   { name:'명동', lat: 37.563576, lng:126.983431},
  //   { name:'가로수길', lat:37.520300, lng:127.023008},
  //   { name:'광화문', lat:37.575268, lng:126.976896},
  //   { name:'남산', lat:37.550925, lng:126.990945},
  //   { name:'이태원', lat:37.540223, lng:126.994005}
  // ]);

  const [map, setMap] = useState("");
  const [markers, setMarkers] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAP_API_KEY,
    libraries: libraries,
  });

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [center]
  );

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handlePlaceSelected = useCallback(
    (place) => {
      const newMarkers = [
        ...markers,
        { position: place, label: String(markers.length + 1) },
      ];
      setMarkers(newMarkers);
    },
    [markers]
  );

  const calculateDistance = (p1, p2) => {
    const R = 6378137;
    const dLat = (p2.lat - p1.lat) * (Math.PI / 180);
    const dLong = (p2.lng - p1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((p1.lat * Math.PI) / 180) *
        Math.cos((p2.lat * Math.PI) / 180) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  // 거리를 계산한 마커들을 정렬해서 저장
  const sortedMarkers = markers
    .map((marker) => ({
      ...marker,
      distance: calculateDistance(center, marker.position),
    }))
    .sort((a, b) => a.distance - b.distance);

  useEffect(() => {
    console.log(sortedMarkers);
  }, [sortedMarkers]);

  return isLoaded ? (
    <Fragment>
      <h1>Google Map</h1>
      <SearchBox map={map} onPlaceSelected={handlePlaceSelected} />
      <hr />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          libraries: "places",
          styles: myStyles,
          disableDefaultUI: true,
          options,
        }}
      >
        {sortedMarkers.map((marker, index) => (
          <MarkerF
            key={index}
            label={String(index + 1)}
            position={marker.position}
          />
        ))}
      </GoogleMap>
    </Fragment>
  ) : null;
};

export default React.memo(MyGoogleMap);