import { where, query, collection, getDocs, setDoc, doc, addDoc, Firestore } from "firebase/firestore";
import { FireStoreDB } from "../main";

import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export default function MovieItem({ title, year, type, poster }) {
  const { user } = useContext(AuthContext);

  const handleClick = async () => {

    // first get the documentID for the specific user
    const usersRef = collection(FireStoreDB, "users");
    const q = query(usersRef, where("email", "==", "daksheshgupta03@gmail.com"))
    // const q = query(usersRef, where("email", "==", `${user.email}`));

    let docID = ''
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      docID = doc.id;
    })

    await setDoc(doc(FireStoreDB, `users/${user.uid}/movies/` + title), {
      poster: poster,
      title: title,
      type: type,
      year: year,
    }).catch((error) => console.log(error))

  };

  return <button onClick={handleClick}>{title}</button>;
}
