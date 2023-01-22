import React, { useState, useEffect, useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

import SearchBar from "../components/SearchBar";
import { AuthContext } from "../components/AuthContext";
import { FireStoreDB } from "../main";
import WatchList from "../components/WatchList";

export default function Home() {
  // Hard coded for now
  // const [shows, setShows] = useState([]);
  const [shows, setShows] = useState([
    "Fleabag",
    "Queen's Gambit",
    "The Last of Us",
    "Avatar: The Way of Water",
    "Game of Thrones",
    "The Office",
  ]);

  const { user } = useContext(AuthContext);

  // Hard coded for now
  // const [pop, setPop] = useState([]);
  const [pop, setPop] = useState([
    "One Piece",
    "Wednesday",
    "Bojack Horseman",
    "The Office",
    "The Last of Us",
  ]);

  // TODO: Finish API and complete this
  const fetchWatched = async () => {
    const q = query(collection(FireStoreDB, `users/${user.uid}/movies`));
    const querySnapshot = await getDocs(q);
    const showArr = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      showArr.push(doc.data().title);
    });

    setShows(showArr);
  };

  // TODO: Finish API and complete this
  const fetchPopular = () => {};

  useEffect(() => {
    // fetchWatched();
  }, []);

  return (
    <>
      <div className="Home-content">
        <div className="Home-box">
          <div>
            <h1>Collect More</h1>
            <SearchBar />
          </div>
          <div>
            <h1> Popular Right Now</h1>
            <div className="Pop-list">
              {pop?.map((element) => {
                return <p>{element}</p>;
              })}
            </div>
          </div>
        </div>
        <div className="Home-box" style={{ gap: 0 }}>
          <h1>Watch List</h1>
          {/* <ol className="Watch-list">
            {shows?.map(element => {
              return <li>{element}</li>;
            })}
          </ol> */}
          <WatchList />
        </div>
      </div>
    </>
  );
}
