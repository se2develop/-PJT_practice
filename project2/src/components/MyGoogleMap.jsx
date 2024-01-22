import React, { useState, useEffect, useCallback, Fragment } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import SearchBox from "./SearchBox";
import Directions from "./Directions";

const libraries = ["places"];

const MyMap = (props) => {
  const containerStyle = {
    width: "700px",
    height: "550px",
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

  const [map, setMap] = useState("");
  const [markers, setMarkers] = useState([]);
  const [sortedPath, setSortedPath] = useState([]);
  const [sortedMarkers, setSortedMarkers] = useState([]);

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

  // 최근접 이웃 알고리즘
  const nearestNeighbor = (markers) => {
    const n = markers.length;
    const visited = Array(n).fill(false);
    const path = [];
    let current = 0;

    path.push(current);
    visited[current] = true;

    for (let i = 0; i < n - 1; i++) {
      let nearestNeighbor = -1;
      let minDistance = Number.MAX_SAFE_INTEGER;

      for (let j = 0; j < n; j++) {
        if (
          !visited[j] &&
          calculateDistance(markers[current].position, markers[j].position) <
            minDistance
        ) {
          nearestNeighbor = j;
          minDistance = calculateDistance(
            markers[current].position,
            markers[j].position
          );
        }
      }

      if (nearestNeighbor !== -1) {
        path.push(nearestNeighbor);
        visited[nearestNeighbor] = true;
        current = nearestNeighbor;
      }
    }

    return path;
  };

  const handlePlaceSelected = useCallback(
    (place) => {
      const newMarkers = [
        ...markers,
        {
          position: place,
          label: String(markers.length + 1),
          placeId: place.placeId,
        },
      ];
      setMarkers(newMarkers);
  
      // 최초 검색 시는 무조건 설정!
      if (newMarkers.length === 1) {
        const path = nearestNeighbor(newMarkers);
        setSortedPath(path);
      } else {
        // 새로운 마커를 기준으로 최적 경로 찾기
        const lastMarker = newMarkers[newMarkers.length - 1];
        const currentPath = nearestNeighbor([lastMarker, ...newMarkers.slice(0, -1)]);
        
        // 현재 마커를 추가한 경로가 더 최적이라면 업데이트
        if (currentPath.length < sortedPath.length) {
          setSortedPath(currentPath);
        }
      }
    },
    [markers, nearestNeighbor, sortedPath]
  );

  useEffect(() => {
    if (markers.length >= 2) {
      console.log("markers: " + markers)
      const path = nearestNeighbor(markers);
      setSortedPath(path);
    }
  }, [markers]);

  useEffect(() => {
    if (sortedPath.length > 0) {
      setSortedMarkers(sortedPath.map((index) => markers[index]));
    }
    console.log(sortedMarkers);
  }, [sortedPath, markers]);

  // // 거리를 계산한 마커들을 정렬해서 저장
  // const sortedMarkers = markers
  //   .map((marker) => ({
  //     ...marker,
  //     distance: calculateDistance(center, marker.position),
  //   }))
  //   .sort((a, b) => a.distance - b.distance);

  const [directionsInfoArr, setDirectionsInfoArr] = useState([]);

  const handleDirectionsInfoUpdate = (directionsInfo) => {
    // 배열에 추가
    setDirectionsInfoArr((prevArr) => [...prevArr, directionsInfo]);
  };

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
        {sortedMarkers.length >= 2 && (
          <Fragment>
            {sortedMarkers.slice(0, -1).map((marker, pathIndex) => (
              <Directions
                key={pathIndex}
                origin={sortedMarkers[pathIndex].position}
                destination={sortedMarkers[pathIndex + 1].position}
                placeId={marker.placeId} // placeId를 Directions 컴포넌트에 전달
                onDirectionsInfoUpdate={handleDirectionsInfoUpdate}
              />
            ))}
          </Fragment>
        )}
      </GoogleMap>
      {directionsInfoArr.length > 0 && (
        <div>
          {directionsInfoArr.map((info, index) => (
            <div key={index}>
              <div>
                출발지: {info.startPlaceId} : {info.startAddress}
              </div>
              <div>
                도착지: {info.endPlaceId} : {info.endAddress}
              </div>
              <div>거리: {info.distance} </div>
              <div>시간: {info.duration} </div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  ) : null;
};

export default React.memo(MyMap);
