import { createContext, useContext, useState } from 'react';


// Create Context
const ThemeContext = createContext();
const UserContext = createContext();

function UseContextDemo() {
    const [theme, setTheme] = useState('light');
    const [user, setUser] = useState({ name: 'Ram', role: 'admin' });

    return (
        <div className="concept-container">
            <h2>🌐 useContext Hook</h2>
            <p className="description">
                Context provides a way to pass data through the component tree
                without passing props manually at every level.
            </p>

            <ThemeContext.Provider value={{ theme, setTheme }}>
                <UserContext.Provider value={{ user, setUser }}>

                    <div className="example-box">
                        <h3>Context Providers Active</h3>
                        <p>Theme: <strong>{theme}</strong></p>
                        <p>User: <strong>{user.name}</strong> ({user.role})</p>
                    </div>

                    {/* Child Components */}
                    <ThemedComponent />
                    <UserDisplay />

                    <pre className="code-snippet">
                        {`// Create Context
const ThemeContext = createContext();

// Provider
<ThemeContext.Provider value={{ theme, setTheme }}>
  <ChildComponents />
</ThemeContext.Provider>

// Consumer
const { theme, setTheme } = useContext(ThemeContext);`}
                    </pre>

                </UserContext.Provider>
            </ThemeContext.Provider>

            <div className="tips-box">
                <h4>💡 When to use Context:</h4>
                <ul>
                    <li>Theme (dark/light mode)</li>
                    <li>User authentication</li>
                    <li>Language/locale settings</li>
                    <li>Global app settings</li>
                </ul>
            </div>
        </div>
    );
}

// Child Component 1
function ThemedComponent() {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <div className={`example-box themed-box ${theme}`}>
            <h3>Themed Component</h3>
            <p>Current theme: <strong>{theme}</strong></p>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                Toggle Theme
            </button>
        </div>
    );
}

// Child Component 2
function UserDisplay() {
    const { user } = useContext(UserContext);

    return (
        <div className="example-box">
            <h3>User Information</h3>
            <p>Logged in as: <strong>{user.name}</strong></p>
            <p>Role: <strong>{user.role}</strong></p>
        </div>
    );
}

export default UseContextDemo;