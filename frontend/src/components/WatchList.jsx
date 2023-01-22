import { useContext } from "react";
import { collection, QuerySnapshot } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { AuthContext } from "./AuthContext";
import { FireStoreDB } from "../main";

export default function WatchList() {
  const { user } = useContext(AuthContext);

  const [value, loading, error] = useCollection(
    collection(FireStoreDB, `users/${user.uid}/movies`)
  );

  return (
    <div className="Watch-list">
      {loading && <span>Loading...</span>}
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {value &&
        value.docs.map((doc) => {
          return (
            <div key={doc.id} className="Movie-item">
              <div className="Movie-info">
                <div id="title-name">{doc.data().title}</div>
                <div id="title-year">{doc.data().year}</div>
              </div>
              <img src={doc.data().poster} id="title-image" />
            </div>
          );
        })}
    </div>
  );
}
