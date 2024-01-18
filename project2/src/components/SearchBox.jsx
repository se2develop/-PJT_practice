import React, { useCallback, useRef, useEffect, useState } from "react";

const SearchBox = ({ mapApi }) => {
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
}
}, []);

const handleSelectButtonClick = (index) => {
// Retrieve and log the coordinates of the selected place
const selectedPlace = selectedPlaces[index];
if (selectedPlace) {
  console.log("Selected Place Coordinates:", selectedPlace.lat, selectedPlace.lng);
}
};

useEffect(() => {
if (!searchBox.current && mapApi) {
  searchBox.current = new mapApi.places.SearchBox(input.current);
  searchBox.current.addListener("places_changed", handleOnPlacesChanged);
}

return () => {
  if (mapApi) {
    searchBox.current = null;
    mapApi.event.clearInstanceListeners(searchBox);
  }
};
}, [mapApi, handleOnPlacesChanged]);

return (
<div>
  <input ref={input} placeholder="SearchBox" type="text" />
  <ul>
    {selectedPlaces.map((place, index) => (
      <li key={index}>
        <span>
          {`Place ${index + 1}: ${place.lat}, ${place.lng}`}
        </span>
        <button onClick={() => handleSelectButtonClick(index)}>
          Select
        </button>
      </li>
    ))}
  </ul>
  <div>
    <h4>All Selected Places:</h4>
    <pre>{JSON.stringify(selectedPlaces, null, 2)}</pre>
  </div>
</div>
);
};

export default SearchBox;