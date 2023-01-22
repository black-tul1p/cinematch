import { useMemo, useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import { AuthContext } from "../components/AuthContext";
import { useContext } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";

import { FireStoreDB } from "../main";

export default function Maps() {
  // Load API
  const key = "AIzaSyB7Iv5iPStyCWSsPkPHQVjiZ0vPWG0aslc";
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key,
  });
  const [currPos, setCurrPos] = useState({}); // Your position on the map

  // Function that gets your location
  const getCurrPos = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const newPos = {
          lat: Math.round(position.coords.latitude),
          lng: Math.round(position.coords.longitude),
        };
        if (newPos != currPos) setCurrPos(newPos);
      });
    }
    console.log(currPos);
  };
  getCurrPos();

  if (!isLoaded) return <div>Loading...</div>;
  return <Map currPos={currPos} />;
}

function Map({ currPos }) {
  const { user } = useContext(AuthContext);
  // const [selected, setSelected] = useState(null); // Selected Marker
  const [markers, setMarkers] = useState([]);
  const center = currPos;
  // const center = useMemo(() => currPos, []);

  const fetchMarkers = async () => {
    const q = query(
      collection(FireStoreDB, `chatrooms/`),
      where("user1", "==", `${user.uid}`)
    );
    const querySnapshot = await getDocs(q);

    const markerArr = querySnapshot.docs.map((doc) => {
      console.log(doc.data());
      return {
        lat: doc.data().location.latitude,
        lng: doc.data().location.longitude,
      };
    });

    const q2 = query(
      collection(FireStoreDB, `chatrooms/`),
      where("user2", "==", `${user.uid}`)
    );
    const querySnapshot2 = await getDocs(q2);
    markerArr.concat(
      querySnapshot2.docs.map((doc) => {
        console.log(doc.data());
        return {
          lat: doc.data().location.latitude,
          lng: doc.data().location.longitude,
        };
      })
    );
    // console.log("BRUH");
    // console.log(markerArr);
    setMarkers(markerArr);
  };

  // Get your location
  useEffect(() => {
    fetchMarkers();
  }, []);

  return (
    <GoogleMap zoom={4.5} center={center} mapContainerClassName="Map-container">
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
              // setSelected(coord);
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
        }}
      />
    </GoogleMap>
  );
}
