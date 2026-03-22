import { useState, useMemo } from "react";
import "./Playground.css";

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initialValue;
    });

    const setStoredValue = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, setStoredValue];
}

const THEMES = {
    LIGHT: "light",
    DARK: "dark",
};

function Playground() {
    const [theme, setTheme] = useLocalStorage("theme", THEMES.LIGHT);

    const currentStyles = useMemo(() => {
        return theme === THEMES.DARK
            ? {
                backgroundColor: "#111",
                color: "#fff",
                padding: "30px",
                borderRadius: "12px",
                transition: "0.3s",
                boxShadow: "0 4px 12px rgba(255, 255, 255, 0.1)",
            }
            : {
                backgroundColor: "#fff",
                color: "#000",
                padding: "30px",
                borderRadius: "12px",
                transition: "0.3s",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            };
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
    };

    return (
        <div className="playground-container">
            <h1>React Playground 🚀</h1>

            <div style={currentStyles}>
                <h2>{theme.toUpperCase()} MODE</h2>

                <button className="btn" onClick={toggleTheme}>
                    {theme === THEMES.LIGHT ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
            </div>
        </div>
    );
}



export default Playground;
