import { useState, useEffect } from 'react';


function UseEffectDemo() {
    const [count, setCount] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [data, setData] = useState(null);

    // Effect 1: Runs on every render
    useEffect(() => {
        console.log('Component rendered!');
    });

    // Effect 2: Runs once on mount
    useEffect(() => {
        console.log('Component mounted!');
        document.title = 'useEffect Demo';

        return () => {
            console.log('Component unmounted!');
        };
    }, []);

    // Effect 3: Runs when count changes
    useEffect(() => {
        console.log('Count changed:', count);
        document.title = `Count: ${count}`;
    }, [count]);

    // Effect 4: Timer with cleanup
    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="concept-container">
            <h2>⚡ useEffect Hook</h2>
            <p className="description">
                useEffect runs side effects after render. Perfect for API calls,
                subscriptions, timers, and DOM updates.
            </p>

            {/* Example 1: Count Effect */}
            <div className="example-box">
                <h3>Example 1: Dependency Array</h3>
                <div className="counter">
                    <button onClick={() => setCount(count - 1)}>-</button>
                    <span className="count-display">{count}</span>
                    <button onClick={() => setCount(count + 1)}>+</button>
                </div>
                <p>Check console and browser tab title!</p>
                <pre className="code-snippet">
                    {`useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]); // Runs when count changes`}
                </pre>
            </div>

            {/* Example 2: Timer */}
            <div className="example-box">
                <h3>Example 2: Timer with Cleanup</h3>
                <div className="timer-display">
                    <span className="timer-value">{seconds}</span> seconds
                </div>
                <pre className="code-snippet">
                    {`useEffect(() => {
  const timer = setInterval(() => {
    setSeconds(prev => prev + 1);
  }, 1000);

  return () => clearInterval(timer); // Cleanup!
}, []);`}
                </pre>
            </div>

            {/* Example 3: API Call */}
            <div className="example-box">
                <h3>Example 3: Fetch Data</h3>
                <button onClick={() => {
                    fetch('https://jsonplaceholder.typicode.com/users/1')
                        .then(res => res.json())
                        .then(data => setData(data));
                }}>
                    Load User Data
                </button>
                {data && (
                    <div className="data-display">
                        <p><strong>Name:</strong> {data.name}</p>
                        <p><strong>Email:</strong> {data.email}</p>
                        <p><strong>City:</strong> {data.address.city}</p>
                    </div>
                )}
                <pre className="code-snippet">
                    {`useEffect(() => {
  fetch(url)
    .then(res => res.json())
    .then(data => setData(data));
}, [url]);`}
                </pre>
            </div>

            <div className="tips-box">
                <h4>💡 Dependency Patterns:</h4>
                <ul>
                    <li><code>useEffect(() =&gt; {`{}`})</code> - Every render</li>
                    <li><code>useEffect(() =&gt; {`{}`}, [])</code> - Mount only</li>
                    <li><code>useEffect(() =&gt; {`{}`}, [dep])</code> - When dep changes</li>
                </ul>
            </div>
        </div>
    );
}

export default UseEffectDemo;