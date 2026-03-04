import { useState, useEffect } from 'react';
import './ComponentMount.css';

function UserData() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Component mounted!');

        setTimeout(() => {
            setUser({ name: 'Ram', age: 22 });
            setLoading(false);
        }, 2000);
    }, []);

    if (loading) return <div className="loading-spinner"><p>Loading...</p></div>;

    return (
        <div className="user-card">
            <div className="user-avatar">👤</div>
            <h2 className="user-name">{user.name}</h2>
            <p className="user-age">Age: <span>{user.age}</span></p>
        </div>
    );
}

function Searchfilter() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        console.log(`Searching for : ${query}`);

        if (query.length > 0) {
            const filtered = ['Apple', 'Banana', 'Orange', 'Mango']
                .filter(item => item.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <div className="search-container">
            <h3 className="section-title">🔍 Fruit Search</h3>
            <input
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search fruits...'>
            </input>

            <ul className="results-list">
                {results.map((item, i) => (
                    <li className="result-item" key={i}>{item}</li>
                ))}
            </ul>
            {results.length === 0 && query && <p className="no-results">No fruits found</p>}
        </div>
    );
}

function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
                console.log('Timer cleaned up!');
            }
        };
    }, [isRunning]);

    return (
        <div className="timer-container">
            <h3 className="section-title">⏱️ Timer</h3>
            <div className="timer-display">{seconds}s</div>
            <div className="timer-buttons">
                <button className="btn btn-primary" onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? '⏸ Pause' : '▶ Start'}
                </button>
                <button className="btn btn-secondary" onClick={() => setSeconds(0)}>↻ Reset</button>
            </div>
        </div>
    );
}


function Dashboard() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [notifications, setNotifications] = useState(0);


    useEffect(() => {
        console.log('Fetching user...');
        fetch('/api/user')
            .then(res => res.json())
            .then(data => setUser(data));
    }, []);


    useEffect(() => {
        if (user) {
            console.log('Fetching posts for user:', user.id);
            fetch(`/api/posts/${user.id}`)
                .then(res => res.json())
                .then(data => setPosts(data));
        }
    }, [user]);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Checking notifications...');
            fetch('/api/notifications')
                .then(res => res.json())
                .then(data => setNotifications(data.count));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">📊 Dashboard</h2>
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <span className="card-icon">👤</span>
                    <p className="card-label">User</p>
                    <p className="card-value">{user?.name || 'Loading...'}</p>
                </div>
                <div className="dashboard-card">
                    <span className="card-icon">📝</span>
                    <p className="card-label">Posts</p>
                    <p className="card-value">{posts.length}</p>
                </div>
                <div className="dashboard-card notification-card">
                    <span className="card-icon">🔔</span>
                    <p className="card-label">Notifications</p>
                    <p className="card-value">{notifications}</p>
                </div>
            </div>
        </div>
    );
}

function ComponentMount() {
    return (
        <div className="component-mount-wrapper">
            <header className="mount-header">
                <h1 className="mount-title">🚀 React Hooks & Lifecycle</h1>
                <p className="mount-subtitle">Advanced Component Examples</p>
            </header>

            <div className="mount-grid">
                <section className="mount-section">
                    <UserData />
                </section>
                <section className="mount-section">
                    <Searchfilter />
                </section>
                <section className="mount-section">
                    <Timer />
                </section>
            </div>
            
            <section className="mount-section full-width">
                <Dashboard />
            </section>
        </div>
    );
}

export default ComponentMount;
export { UserData, Searchfilter, Timer, Dashboard };