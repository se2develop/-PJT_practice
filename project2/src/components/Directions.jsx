import React, { useState, useEffect, useRef, Fragment } from "react";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";

const Directions = ({ origin, destination }) => {
  const [directions, setDirections] = useState();
  const count = useRef(0);

  const dirOptions = {
    // 경로선 색, 두께, 투명도
    polylineOptions: {
      strokeColor: "red",
      strokeWeight: 6,
      strokeOpacity: 0.5,
    },
    // 기본마커 제거
    suppressMarkers: true,
  };

  useEffect(() => {
    count.current = 0;
    // console.log(origin, destination);
  }, [origin, destination]);

  const directionsCallback = (result, status) => {
    // console.log(result, status);
    // 동일한 방향에 대해 여러 번의 콜백이 발생하는 경우에도 첫 번째 호출만 고려
    if (status === "OK" && count.current === 0) {
      console.log("출발 : " + result.routes[0].legs[0].start_address);
      console.log("도착 : " + result.routes[0].legs[0].end_address);
      console.log("거리 : " + result.routes[0].legs[0].duration.text);
      console.log("시간 : " + result.routes[0].legs[0].distance.text);
      count.current += 1;
      setDirections(result);
    }
  };

  useEffect(() => {
   // console.log("Directions updated:", setDirections);
  }, [setDirections]);


  return (
    <Fragment>
      <DirectionsService
        options={{ origin, destination, travelMode: "TRANSIT",}}
        callback={directionsCallback}
      />
      <DirectionsRenderer directions={directions} options={dirOptions} />
   </Fragment>
  );
};

export default Directions;
