import { useContext } from "react";
import { collection, QuerySnapshot } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';

import { AuthContext } from "./AuthContext";
import { FireStoreDB } from '../main';

export default function WatchList() {

  const { user } = useContext(AuthContext);

  const [value, loading, error] = useCollection(collection(FireStoreDB, `users/${user.uid}/movies`))

  const imageStyle = {
    height: "100px",
    width: "100px",
  };

  const boxStyle = {
    height: "150px",
    width: "300px",
  }


  return (
    <ol className="Watch-list">
      {loading && <span>Loading...</span>}
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {value && value.docs.map((doc) => {
        console.log(doc)
        return <li key={doc.id} style = {boxStyle}>
                <ul class="sub-menu" type="none">
                  <li>
                    {doc.data().title}
                  </li>
                  <li>
                    <img src={doc.data().poster} style = {imageStyle} />
                  </li>
                  <li>
                    {doc.data().year}
                  </li>
                </ul>
               </li>
      })}
    </ol>
  )


}



