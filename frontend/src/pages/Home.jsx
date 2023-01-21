import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

export default function Home() {
  // Hard coded for now
  // const [shows, setShows] = useState([]);
  const [shows, setShows] = useState([
    "Queen's Gambit",
    "The Last of Us",
    "Avatar: The Way of Water",
    "Game of Thrones",
    "The Office",
  ]);

  // TODO: Finish API and complete this
  const fetchWatched = () => {

  };

  return (
    <>
      <div className="Home-content">
        <div className="Home-box">
          <h1>Search Placeholder</h1>
          <SearchBar />
        </div>
        <div className="Home-box">
          <h1>Watch List</h1>
          <ol className="Watch-list">
            {shows?.map((element, idx) => {
              return <li>{element}</li>;
            })}
          </ol>
        </div>
      </div>
    </>
  );
}
