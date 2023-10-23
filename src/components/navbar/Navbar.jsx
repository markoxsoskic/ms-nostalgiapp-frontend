import React, { useContext } from "react";
import { ThemeContext } from "../../UserContext";
import "./Navbar.css";

export default function Navbar() {

    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

    function handleClick() {
        setIsDarkMode(!isDarkMode);
    }

    return (
        <nav id={isDarkMode ? "dark" : "light"}>
            <h1>Nostalgiapp</h1>
            <button onClick={handleClick}>{isDarkMode ? <i className="fa-solid fa-sun fa-2x"></i> : <i className="fa-solid fa-moon fa-2x"></i>}</button>
        </nav>
    )
}