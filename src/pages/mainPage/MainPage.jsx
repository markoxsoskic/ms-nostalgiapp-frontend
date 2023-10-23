import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext, AuthContext, ThemeContext, DeleteAccount } from "../../UserContext";
import "./MainPage.css";
import Card from "../../components/card/Card";
import { useContext } from "react";

export default function MainPage() {

    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const { userName, setUserName } = useContext(AuthContext);
    const { deleteAccount, setDeleteAccount } = useContext(DeleteAccount);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const [searchResult, setSearchResult] = useState("");

    const params = useParams();
    const navigate = useNavigate();

    const [cards, setCards] = useState([]);

    useEffect(() => {

        // check whether the user is actually logged in:

        fetch("https://ms-nostalgiapp-backend.onrender.com/auth/find/" + params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                if (data.isLoggedIn === false) {
                    setIsLoggedIn(false);
                } else {
                    setUserName(`${data.firstName} ${data.lastName}`)
                }
            });

        // if yes, then:

        setIsLoggedIn(true);
        fetch("https://ms-nostalgiapp-backend.onrender.com/main/" + params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setCards(data))
            .catch((err) => {
                console.log(err);
            })

    }, [])

    async function handleLogout() {
        try {
            fetch(`https://ms-nostalgiapp-backend.onrender.com/auth/${params.id}/logout`, {
                method: "POST"
            }).then(() => {
                setIsLoggedIn(false);
                navigate("/ms-nostalgiapp-frontend/login");
            })
        } catch (err) {
            console.log(err);
        }
    }

    async function handleDelete(id) {
        try {
            fetch(`https://ms-nostalgiapp-backend.onrender.com/main/${params.id}/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(() => {
                setCards((prev) => {
                    return prev.filter((item) => {
                        return item._id !== id;
                    })
                })
            })
                .then(() => {
                    navigate(`/ms-nostalgiapp-frontend/main/${params.id}`);
                })
        } catch (err) {
            console.log(err);
        }
    }

    async function handleRead(id) {
        try {
            fetch(`https://ms-nostalgiapp-backend.onrender.com/main/${params.id}/post/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(() => {

                navigate(`/ms-nostalgiapp-frontend/main/${params.id}/post/${id}`);
            })
        } catch (err) {
            console.log(err);
        }
    }

    async function handleCloseAccount() {
        setDeletePopUp(true);
    }

    function handleYes() {
        setDeletePopUp(false);
        setDeleteAccount(true);
        try {
            fetch(`https://ms-nostalgiapp-backend.onrender.com/auth/${params.id}/close`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(() => {
                setIsLoggedIn(false);
                navigate("/ms-nostalgiapp-frontend/");
            })
        } catch (err) {
            console.log(err);
        }
    }

    function handleNo() {
        setDeletePopUp(false);
    }

    function handleSearch() {
        fetch("https://ms-nostalgiapp-backend.onrender.com/main/" + params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setCards(data))
            .catch((err) => {
                console.log(err);
            }).then(() => {
                setCards((prev) => {
                    return prev.filter((each) => {
                        return each.location.toLowerCase().includes(searchResult.toLowerCase());
                    })
                })
            })

        setSearchResult("");
    }

    function handleRestart() {
        fetch("https://ms-nostalgiapp-backend.onrender.com/main/" + params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setCards(data))
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <main>
            {deletePopUp && <div className="deletePopUp">
                <div className="popUp">
                    <p>Are you sure you want to permanently close your account?</p>
                    <div className="finalAnswer">
                        <button className="yes" onClick={handleYes}>Yes</button>
                        <button className="no" onClick={handleNo}>No</button>
                    </div>
                </div>
            </div>}
            <section id={isDarkMode ? "dark" : "light"} className="status">

                <div className="leftBox">
                    {isLoggedIn && <Link to={`/ms-nostalgiapp-frontend/main/${params.id}/new`}><i className="fa-solid fa-star"></i></Link>}
                    {isLoggedIn && <input onChange={(e) => setSearchResult(e.target.value)} className="search-field" type="search" placeholder="Seach by location" value={searchResult}></input>}
                    {isLoggedIn && <button onClick={handleSearch} className="search-button"><i className="fa-solid fa-magnifying-glass"></i></button>}
                    {isLoggedIn && <button onClick={handleRestart} className="restart-button"><i className="fa-solid fa-house"></i></button>}
                </div>
                <div className="rightBox">
                    {isLoggedIn && <p>{`Logged in as ${userName}`}</p>}
                    {isLoggedIn && <button onClick={handleLogout}><i className="fa-solid fa-power-off"></i></button>}
                    {isLoggedIn && <button onClick={handleCloseAccount}><i className="fa-solid fa-circle-xmark"></i></button>}
                </div>

            </section>
            <section id={isDarkMode ? "dark" : "light"} className="memory-cards">
                {cards.length == 0 && <p>Press <i className="fa-solid fa-star"></i> to add a memory!</p>}
                {cards && cards.map((each) => {
                    return (
                        <div key={Math.random() * 8501837572951398} className="card">
                            <Card key={each._id}
                                id={each._id}
                                userId={each.userId}
                                url={each.url}
                                heading={each.heading}
                                location={each.location}
                                date={each.date}
                                description={each.description}
                                handleRead={handleRead}
                                handleDelete={handleDelete}
                            />
                        </div>)
                })}

            </section>
        </main>
    )
}