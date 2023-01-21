import { useState } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");

    // TODO: Update with actual API call
    const submitQuery = () => {
        alert("Submitted!");
    };

    return (
        <div className="Search-bar">
            <form>
                {console.log(query)}
                <input className="Search-input" type="text" placeholder="Search..." onSubmit={submitQuery} onChange={(event) => {setQuery(event.target.value);}}/>
                <button type="submit" onClick={submitQuery}>Add</button>
            </form>
        </div>
    );
;}