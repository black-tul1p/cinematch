import { useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";

export default function Maps() {
  // Load API
  const key = "AIzaSyB7Iv5iPStyCWSsPkPHQVjiZ0vPWG0aslc";
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const [currPos, setCurrPos] = useState({}); // Your position on the map
  const [selected, setSelected] = useState(null); // Selected Marker
  const [markers, setMarkers] = useState([
    // Chat room locations
    { lat: 44, lng: -80 },
    { lat: 87, lng: 80 },
    { lat: 65, lng: -65 },
    { lat: 44, lng: -87 },
    { lat: 80, lng: 180 },
  ]);

  // Function that gets your location
  const getCurrPos = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrPos({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  // TODO: Fetch chat room locations and update markers[]
  const fetchMarkers = () => {};

  // Get your location
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
      {markers.map(
        // CHAT MARKERS
        (coord) => (
          <MarkerF
            position={{
              lat: coord.lat,
              lng: coord.lng,
            }}
            // For clicking markers (not currently working)
            onClick={() => {
              setSelected(coord);
              console.log(coord);
            }}
          />
        )
      )}
      <MarkerF // YOUR MARKER
        position={currPos}
        // For clicking marker (not currently working)
        onClick={() => {
          setSelected(currPos);
          console.log(currPos);
        }}
      />
    </GoogleMap>
  );
}
