import React, { useContext } from "react";
import { ThemeContext, ErrorContext } from "../../UserContext";
import { Link } from "react-router-dom";
import "./AlertPage.css";

export default function HomePage() {
    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
    return (
        <section id={isDarkMode ? "dark" : "light"} className="alertpage-panel">
            <div>
                <span>Please check your inbox and verify your account!</span>
            </div>
            <Link to="/ms-nostalgiapp-frontend/login">Login</Link>
        </section>
    )
}