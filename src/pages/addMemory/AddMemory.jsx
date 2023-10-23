import React from "react";
import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../../UserContext";
import "./AddMemory.css";

export default function AddMemory() {

    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

    const [url, setUrl] = useState("");
    const [heading, setHeading] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("01 Jan 2023");
    const [description, setDescription] = useState("");
    const [placeholder, setPlaceholder] = useState("Upload an image");

    const params = useParams();
    const navigate = useNavigate();

    function handleChange(e) {
        let code = "abc" + Math.floor(Math.random() * 692384436334) + "def" + Date.now() + "ghi" + Math.floor(Math.random() * 721389829);
        setUrl(`https://ms-nostalgiapp-backend.onrender.com/uploads/${code}.jpeg`);
        let formData = new FormData();
        formData.append("image", e.target.files[0]);
        fetch(`https://ms-nostalgiapp-backend.onrender.com/image/${code}`, {
            method: "POST",
            body: formData
        }).then(res => res.json())
            .then(resBody => console.log(resBody))
        setPlaceholder("Image uploaded")
    }

    async function handleClick(e) {
        e.preventDefault();
        try {
            let memory = {
                userId: params.id,
                url: url,
                heading: heading,
                location: location,
                date: date,
                description: description,
            }
            fetch(`https://ms-nostalgiapp-backend.onrender.com/main/${params.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(memory),
            })
            navigate(`/ms-nostalgiapp-frontend/main/${params.id}`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section id={isDarkMode ? "dark" : "light"} className="addMemory-panel">
            <form>
                <div className="fileInputs">
                    <input className="fakeFileInput" placeholder={placeholder}></input>
                    <input className="realFileInput" onChange={handleChange}
                        name="image"
                        type="file"
                        id="memory"
                        accept="image/jpeg"></input>
                </div>
                <input onChange={(e) => setHeading(e.target.value)} type="text" placeholder="Memory title" value={heading} required></input>
                <input onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Memory location" value={location} required></input>
                <input onChange={(e) => setDate(e.target.value)} type="date" value={date} required></input>
                <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Memory description" rows="5" value={description} required></textarea>
                {heading && location && date && description && <button onClick={handleClick}>Save!</button>}
            </form>
            <Link to={`/ms-nostalgiapp-frontend/main/${params.id}`} className="close">Close!</Link>
        </section>
    )
}