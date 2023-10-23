import React, { useContext } from "react";
import { ThemeContext, ErrorContext } from "../../UserContext";
import { Link } from "react-router-dom";
import "./ErrorPage.css";

export default function HomePage() {

    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
    const { errorCode, setErrorCode } = useContext(ErrorContext);

    return (
        <section id={isDarkMode ? "dark" : "light"} className="errorpage-panel">
            <div>
                {errorCode == 400 ? <span>The e-mail you've entered is already connected to another account!</span> :
                    errorCode == 401 ? <span>The credentials you've entered are not connected to any account!</span> :
                        errorCode == 402 ? <span>The password you've entered is incorrect!</span> :
                            errorCode == 403 ? <span>Your account is not verified!</span> : null}
            </div>
            <Link to={errorCode == 400 ? "/ms-nostalgiapp-frontend/" : "/ms-nostalgiapp-frontend/login"}>Try again!</Link>
        </section>
    )
}