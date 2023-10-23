import React, { useContext } from "react";
import { ThemeContext } from "../../UserContext";
import "./Footer.css";

export default function Footer() {

    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

    return (
        <footer id={isDarkMode ? "dark" : "light"}>
            <span>© 2023 <a href="https://www.markososkic.com/" target="_blank">Marko
                Soskic</a></span>
        </footer>
    )
}