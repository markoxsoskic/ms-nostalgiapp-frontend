import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../UserContext";
import "./Card.css";
import defaultImage from "./images/default.png"

export default function Card(props) {

    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

    function handleDelete() {
        props.handleDelete(props.id);
    }

    function handleRead() {
        props.handleRead(props.id);
    }

    return (
        <article id={isDarkMode ? "dark" : "light"} className="memory">
            <img src={props.url ? props.url : defaultImage}></img>
            <div className="memory-info">
                <h2>{props.heading.slice(0, 20)}</h2>
                <div className="memory-location-date">
                    <p>{props.location}</p>
                    <p>{props.date}</p>
                </div>
                <span className="memory-description">{props.description && props.description.slice(0, 40) + "..."}</span>
                <div className="memory-links">
                    <Link onClick={handleRead} className="read-more" >Read More</Link>
                    <button onClick={handleDelete} className="delete"><i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </article>
    )
}