import { useState } from "react";

export default function MovieItem({ title, year, type, poster }){

    const handleClick = () => {
        console.log('add movie clicked')
        // do database stuff here
    }

    return (
        <button onClick={handleClick}>{title}</button>
    )
}