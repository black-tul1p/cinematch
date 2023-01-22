import {
  where,
  query,
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  Firestore,
} from "firebase/firestore";
import { FireStoreDB } from "../main";
import { GeoPoint } from "firebase/firestore";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export default function MovieItem({ title, year, type, poster, handleOpen }) {
  const { user } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    // first get the documentID for the specific user
    const usersRef = collection(FireStoreDB, "users");
    const q = query(
      usersRef,
      where("email", "==", "daksheshgupta03@gmail.com")
    );
    // const q = query(usersRef, where("email", "==", `${user.email}`));

    // Adds user to users/uid/movies
    await setDoc(doc(FireStoreDB, `users/${user.uid}/movies/` + title), {
      poster: poster,
      title: title,
      type: type,
      year: year,
    }).catch((error) => console.log(error));

    // Adds movie in movies collection
    await setDoc(doc(FireStoreDB, `movies/${title}`), {
      poster: poster,
      title: title,
      type: type,
      year: year,
    }).catch((error) => console.log(error));

    // Adds user in movies/title/users/
    navigator.geolocation.getCurrentPosition(async (pos) => {
      await setDoc(doc(FireStoreDB, `movies/${title}/users/` + user.uid), {
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        email: user.email,
        location: new GeoPoint(pos.coords.latitude, pos.coords.longitude),
      }).catch((error) => console.log(error));
    });

    handleOpen();
  };

  return <button onClick={handleClick}>{title}</button>;
}
