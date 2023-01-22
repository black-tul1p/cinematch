import { useCollection } from 'react-firebase-hooks';
import { useContext } from "react";
import { collection, QuerySnapshot } from "firebase/firestore";

import { AuthContext } from "./AuthContext";r
import { FireStoreDB } from '../main';

export default function WatchList() {

  const { user } = useContext(AuthContext);

  const [value, loading, error] = useCollection(collection(FireStoreDB, `users/${user.uid}/movies`))

  return (
    <ol className="Watch-list">
      {value.docs.map((doc) => {
        <li key={doc.id}>{doc.data().title}</li>
      })}
    </ol>
  )
}



