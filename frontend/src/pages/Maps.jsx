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

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const { user } = useContext(AuthContext);
  const [currPos, setCurrPos] = useState({}); // Your position on the map
  // const [selected, setSelected] = useState(null); // Selected Marker
  const [markers, setMarkers] = useState([
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
    console.log("BRUH");
    console.log(markerArr)
    setMarkers(markerArr);
  };

  // Get your location
  getCurrPos();
  useEffect(() => {
    fetchMarkers();
  }, []);

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
              // setSelected(coord);
              console.log(coord);
            }}
          />
        )
      )}
      {/* <MarkerF // YOUR MARKER
        position={currPos}
        // For clicking marker (not currently working)
        onClick={() => {
          setSelected(currPos);
          console.log(currPos);
        }}
      /> */}
    </GoogleMap>
  );
}
