import { useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";

export default function Maps() {
  const key = "AIzaSyB7Iv5iPStyCWSsPkPHQVjiZ0vPWG0aslc";

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const [currPos, setCurrPos] = useState({});
  const [selected, setSelected] = useState(null);
  const [markers, setMarkers] = useState([
    { lat: 44, lng: -80 },
    { lat: 87, lng: 80 },
    { lat: 65, lng: -65 },
    { lat: 44, lng: -87 },
    { lat: 80, lng: 180 },
  ]);

  // TODO: Set to current user location
  const getCurrPos = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrPos({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
    // const center = useMemo(() => currPos, []);
    // console.log(center);
  };

  const fetchMarkers = () => {};

  getCurrPos();

  return (
    <GoogleMap
      zoom={4.5}
      center={currPos}
      mapContainerClassName="Map-container"
    >
      {/* {selected && (
        <InfoWindow
          onCloseClick={() => {
            setSelected(null);
          }}
          position={{
            lat: selected.lat,
            lng: selected.lng,
          }}
        />
      )} */}
      {markers.map((coord) => (
        <MarkerF
          position={{
            lat: coord.lat,
            lng: coord.lng,
          }}
          onClick={() => {
            setSelected(coord);
            console.log(coord);
          }}
        />
      ))}
      <MarkerF
        position={currPos}
        onClick={() => {
          setSelected(currPos);
          console.log(currPos);
        }}
      />
    </GoogleMap>
  );
}
