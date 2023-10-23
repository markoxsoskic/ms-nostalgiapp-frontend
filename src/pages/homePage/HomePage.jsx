import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ThemeContext, ErrorContext } from "../../UserContext";
import "./HomePage.css";

export default function HomePage() {

    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
    const { errorCode, setErrorCode } = useContext(ErrorContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");

    const navigate = useNavigate();

    async function handleRegister(e) {

        e.preventDefault();

        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            location: location
        }

        if (firstName && lastName && email && password && location) {
            await fetch("https://ms-nostalgiapp-backend.onrender.com/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            }).then(res => {
                if (res.status == 400) {
                    setErrorCode(400);
                    navigate("/ms-nostalgiapp-frontend/error");
                } else {
                    navigate("/ms-nostalgiapp-frontend/accountverificationalert");
                }
            }
            )
        }
    }

    return (
        <section id={isDarkMode ? "dark" : "light"} className="homepage-panel">
            <form>
                <input onChange={(e) => setFirstName(e.target.value)} type="text" name="firstName" placeholder="First Name"></input>
                <input onChange={(e) => setLastName(e.target.value)} type="text" name="lastName" placeholder="Last Name"></input>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="E-mail"></input>
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password"></input>
                <input onChange={(e) => setLocation(e.target.value)} type="text" name="location" placeholder="Location"></input>
                <button onClick={handleRegister}>Sign Up</button>
            </form>
            <Link to="/ms-nostalgiapp-frontend/login">Click here to login.</Link>
        </section>
    )
}