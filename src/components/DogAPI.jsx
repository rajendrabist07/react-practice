import { useState, useEffect } from "react";
import "./DogAPI.css";

export default function DogAPI() {
    const [dogImage, setDogImage] = useState("");

    async function getDog() {
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await res.json();
        setDogImage(data.message);
    }

    useEffect(() => {
        getDog();
    }, []);

    return (
        <div className="dog-container">
            <h1>Random Dog Generator 🐶</h1>

            <div className="dog-card">
                <img src={dogImage} alt="Random Dog" className="dog-img" />
            </div>

            <button onClick={getDog} className="dog-btn">
                Get New Dog
            </button>
        </div>
    );
}
