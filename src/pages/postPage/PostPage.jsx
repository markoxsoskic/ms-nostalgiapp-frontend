import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ThemeContext } from "../../UserContext";
import "./PostPage.css"
import defaultImage from "./images/default.png"

export default function PostPage() {

    const params = useParams();
    const [post, setPost] = useState("");

    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

    const getPost = async () => {

        try {
            await fetch(`https://ms-nostalgiapp-backend.onrender.com/main/${params.id}/post/${params.post}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
                .then(data => setPost(data));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getPost();
    }, [])

    return (
        <section id={isDarkMode ? "dark" : "light"} className="post-panel">
            {post && <img src={post.url ? post.url : defaultImage}></img>}
            {post && <div className="event-info">
                <div>
                    {<h1>{post.heading}</h1>}
                    <div className="location-and-date">
                        {<span>{post.location}</span>}
                        {<span>{post.date}</span>}
                    </div>
                    {<span className="memory-description">{post.description}</span>}
                </div>
                <div>
                    <Link to={`/ms-nostalgiapp-frontend/main/${params.id}`}><i className="fa-solid fa-backward"></i></Link>
                </div>
            </div>}
        </section>
    )
}