import React, { useCallback, useRef, useEffect, useState } from "react";
import { useJsApiLoader } from '@react-google-maps/api';

const Search = ({ map, onPlaceSelected }) => {
  const input = useRef(null);
  const searchBox = useRef(null);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const handleOnPlacesChanged = useCallback(() => {
    const places = searchBox.current.getPlaces();

    if (places.length > 0) {
      const selectedPlace = places[0];
      const lat = selectedPlace.geometry.location.lat();
      const lng = selectedPlace.geometry.location.lng();

      // Save the selected place to the array
      setSelectedPlaces((prevPlaces) => [...prevPlaces, { lat, lng }]);
      onPlaceSelected({ lat, lng });
    }
  }, [onPlaceSelected]);


  useEffect(() => {
    if (map) {
      searchBox.current = new window.google.maps.places.SearchBox(input.current);
      searchBox.current.addListener("places_changed", handleOnPlacesChanged);
    }

    return () => {
      if (map) {
        searchBox.current = null;
        window.google.maps.event.clearInstanceListeners(searchBox);
      }
    };
  }, [map, handleOnPlacesChanged]);

  return <input ref={input} placeholder="장소 검색" type="text" />;
};

export default Search;