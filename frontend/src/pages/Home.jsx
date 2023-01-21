import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

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
  const fetchWatched = () => {
      
  };

  // TODO: Finish API and complete this
  const fetchPopular = () => {

  };

  return (
    <>
      <div className="Home-content">
        <div className="Home-box">
          <div>
            <h1>Collect More</h1>
            <SearchBar setShows={setShows}/>
          </div>
          <div>
            <h1> Popular Right Now</h1>
            <div className="Pop-list">
            {pop?.map(element => {
              return <p>{element}</p>;
            })}
            </div>
          </div>
        </div>
        <div className="Home-box" style={{ gap: 0 }}>
          <h1>Watch List</h1>
          <ol className="Watch-list">
            {shows?.map(element => {
              return <li>{element}</li>;
            })}
          </ol>
        </div>
      </div>
    </>
  );
}
