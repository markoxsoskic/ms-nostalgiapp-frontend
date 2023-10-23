import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext, AuthContext, ThemeContext, ErrorContext } from "../../UserContext";
import "./LoginPage.css";

export default function LoginPage() {

    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const { userName, setUserName } = useContext(AuthContext);
    const { errorCode, setErrorCode } = useContext(ErrorContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleLogin(e) {

        e.preventDefault();

        const user = {
            email: email,
            password: password,
        }

        if (email && password) {
            const checkedUser = await fetch("https://ms-nostalgiapp-backend.onrender.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            })

            const loggedUser = await checkedUser.json();

            if (loggedUser.loggedUser) {
                console.log(loggedUser)
                setIsLoggedIn(true);
                setUserName(loggedUser.loggedUser.firstName + " " + loggedUser.loggedUser.lastName);
                { loggedUser.loggedUser && navigate(`/ms-nostalgiapp-frontend/main/${loggedUser.loggedUser._id}`) };
            } else {
                setIsLoggedIn(false);
                const checkedUser = await fetch("https://ms-nostalgiapp-backend.onrender.com/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user)
                }).then(res=>setErrorCode(res.status))
                .then(()=>navigate("/ms-nostalgiapp-frontend/error"))
            }
        }
    }

    return (
        <section id={isDarkMode ? "dark" : "light"} className="login-panel">
            <form>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="E-mail"></input>
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password"></input>
                <button onClick={handleLogin}>Login</button>
            </form>
            <Link to="/ms-nostalgiapp-frontend/">Click here to sign up.</Link>
        </section>
    )
}