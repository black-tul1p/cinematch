import {
  where,
  query,
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  Firestore,
  orderBy,
  limit,
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
        isPaired: false,
      }).catch((error) => console.log(error));
    });

    // We get a random user in the movies/title/users collection
    // where the movie title is the one the user had just added
    // and we create a chatroom for it.

    const chatPairingQuery = query(
      collection(FireStoreDB, `movies/${title}/users`),
      where("isPaired", "==", false),
      where("uid", "!=", `${user.uid}`),
      limit(1)
    );

    const chatPairingQuerySnapshot = await getDocs(chatPairingQuery);
    chatPairingQuerySnapshot.forEach(async (document) => {
      console.log(document.id, " => ", document.data());

      const user2 = document.data();
      console.log(user2);

      // create a chatroom with logged in user, and the one just retrieved
      await setDoc(
        doc(FireStoreDB, `chatrooms/${title}${user.uid}${user2.uid}`),
        {
          movie: title,
          user1: user.uid,
          user2: user2.uid,
        }
      ).catch((error) => console.error(error));

      // we have to set isPaired to true for the both users in the movie collection`

      await setDoc(
        doc(FireStoreDB, `movies/${title}/users/${user.uid}`),
        {
          isPaired: true,
        },
        { merge: true }
      );

      await setDoc(
        doc(FireStoreDB, `movies/${title}/users/${user2.uid}`),
        {
          isPaired: true,
        },
        { merge: true }
      );
    });

    handleOpen();
  };

  return <button onClick={handleClick}>{title}</button>;
}
