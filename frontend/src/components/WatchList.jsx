import { useContext } from "react";
import { collection, QuerySnapshot } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';

import { AuthContext } from "./AuthContext";
import { FireStoreDB } from '../main';

export default function WatchList() {

  const { user } = useContext(AuthContext);

  const [value, loading, error] = useCollection(collection(FireStoreDB, `users/${user.uid}/movies`))

  return (
    <ol className="Watch-list">
      {loading && <span>Loading...</span>}
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {value && value.docs.map((doc) => {
        return <li key={doc.id}>{doc.data().title}</li>
      })}
    </ol>
  )
}



