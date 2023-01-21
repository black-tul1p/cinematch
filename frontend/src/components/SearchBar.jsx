import { useState } from "react";

import MovieItem from "./MovieItem";

export default function SearchBar({ setShows }) {
    const [query, setQuery] = useState("");//query is the variable for what is searched
    const [titles, setTitles] = useState([]);

    // TODO: Update with actual API call
    const submitQuery = async (e) => {
        e.preventDefault();
        console.log("query submitted");
        const url = `http://www.omdbapi.com/?s=${query}&apikey=cd6be92b`;
        console.log(url);
        console.log("QUery: " + query);
		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
            console.log(responseJson.Search);
            const results = responseJson.Search;
            const titles_list = [];
            results.forEach(element => {
                titles_list.push(element);
            }
            );
            setTitles(titles_list);
		}
        console.log("TEST");
        
    };

    return (
        <div className="Search-bar">
            <form>
                <input className="Search-input" type="text" placeholder="Search..." onSubmit={submitQuery} onChange={(event) => {setQuery(event.target.value);}}/>
                <button type="submit" onClick={submitQuery}>Add</button>
                <ul>

                </ul>
            </form>
            <div>
                <ul>
                    {titles?.map(element => {
                    return <MovieItem title={element.Title} year={element.Year} type={element.Type} poster={element.Poster} />;
                    })}
                </ul>
            </div>
        </div>
    );
;}