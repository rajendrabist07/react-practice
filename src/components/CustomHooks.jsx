import { useState, useEffect } from 'react';


// Custom Hook 1: useFetch
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
}

// Custom Hook 2: useToggle
function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue);
    const toggle = () => setValue(!value);
    return [value, toggle];
}

// Custom Hook 3: useLocalStorage
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

function CustomHooksDemo() {
    const [url, setUrl] = useState('');
    const { data, loading, error } = useFetch(url);

    const [isVisible, toggleVisible] = useToggle(true);
    const [name, setName] = useLocalStorage('username', '');

    return (
        <div className="concept-container">
            <h2>🎨 Custom Hooks</h2>
            <p className="description">
                Custom hooks let you extract component logic into reusable functions.
                They must start with "use".
            </p>

            {/* Custom Hook 1: useFetch */}
            <div className="example-box">
                <h3>Custom Hook 1: useFetch</h3>
                <button onClick={() => setUrl('https://jsonplaceholder.typicode.com/users/1')}>
                    Fetch User Data
                </button>

                {loading && <p>Loading...</p>}
                {error && <p className="error-text">Error: {error}</p>}
                {data && (
                    <div className="data-display">
                        <p><strong>Name:</strong> {data.name}</p>
                        <p><strong>Email:</strong> {data.email}</p>
                    </div>
                )}

                <pre className="code-snippet">
                    {`function useFetch(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url).then(res => res.json()).then(setData);
  }, [url]);
  return { data, loading, error };
}`}
                </pre>
            </div>

            {/* Custom Hook 2: useToggle */}
            <div className="example-box">
                <h3>Custom Hook 2: useToggle</h3>
                <button onClick={toggleVisible}>
                    {isVisible ? 'Hide' : 'Show'} Message
                </button>
                {isVisible && <p className="message">👋 I can be toggled!</p>}

                <pre className="code-snippet">
                    {`function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(!value);
  return [value, toggle];
}

const [isVisible, toggleVisible] = useToggle(true);`}
                </pre>
            </div>

            {/* Custom Hook 3: useLocalStorage */}
            <div className="example-box">
                <h3>Custom Hook 3: useLocalStorage</h3>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name (saved to localStorage)"
                    className="demo-input"
                />
                <p>Saved name: <strong>{name || 'None'}</strong></p>

                <pre className="code-snippet">
                    {`function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}`}
                </pre>
            </div>

            <div className="tips-box">
                <h4>💡 Custom Hook Rules:</h4>
                <ul>
                    <li>Name must start with "use"</li>
                    <li>Can use other hooks inside</li>
                    <li>Returns whatever you need</li>
                </ul>
            </div>
        </div>
    );
}

export default CustomHooksDemo;