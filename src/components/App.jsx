import React, { useState } from "react";
import { UserContext, AuthContext, ThemeContext, DeleteAccount, ErrorContext } from "../UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import HomePage from "../pages/homePage/HomePage.jsx";
import LoginPage from "../pages/loginPage/LoginPage.jsx";
import MainPage from "../pages/mainPage/MainPage.jsx";
import PostPage from "../pages/postPage/PostPage.jsx";
import AddMemory from "../pages/addMemory/AddMemory.jsx";
import Footer from "./footer/Footer";
import ErrorPage from "../pages/errorPage/ErrorPage.jsx";
import AlertPage from "../pages/alertPage/AlertPage.jsx";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [errorCode, setErrorCode] = useState("");

  return (
    <>
      <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
        <DeleteAccount.Provider value={{ deleteAccount, setDeleteAccount }}>
          <Navbar />
          <Router>
            <AuthContext.Provider value={{ userName, setUserName }}>
              <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                <ErrorContext.Provider value={{ errorCode, setErrorCode }}>
                    <Routes>
                      <Route exact path="/ms-nostalgiapp-frontend/" element={<HomePage />} />
                      <Route path="/ms-nostalgiapp-frontend/error" element={<ErrorPage />} />
                      <Route path="/ms-nostalgiapp-frontend/accountverificationalert" element={<AlertPage />} />
                      <Route path="/ms-nostalgiapp-frontend/login" element={<LoginPage />} />
                      <Route path="/ms-nostalgiapp-frontend/main/:id" element={<MainPage />} />
                      <Route path="/ms-nostalgiapp-frontend/main/:id/post/:post" element={<PostPage />} />
                      <Route path="/ms-nostalgiapp-frontend/main/:id/new" element={<AddMemory />} />
                    </Routes>
                </ErrorContext.Provider>
              </UserContext.Provider>
            </AuthContext.Provider>
          </Router>
          <Footer />
        </DeleteAccount.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
