import { useState } from 'react';


function UseStateDemo() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div className="concept-container">
            <h2>🎣 useState Hook</h2>
            <p className="description">
                useState lets you add state to functional components.
                It returns [currentValue, updateFunction].
            </p>

            {/* Example 1: Counter */}
            <div className="example-box">
                <h3>Example 1: Counter</h3>
                <div className="counter">
                    <button onClick={() => setCount(count - 1)}>-</button>
                    <span className="count-display">{count}</span>
                    <button onClick={() => setCount(count + 1)}>+</button>
                    <button onClick={() => setCount(0)}>Reset</button>
                </div>
                <pre className="code-snippet">
                    {`const [count, setCount] = useState(0);
setCount(count + 1); // Update state`}
                </pre>
            </div>

            {/* Example 2: Input */}
            <div className="example-box">
                <h3>Example 2: Text Input</h3>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Type your name..."
                    className="demo-input"
                />
                <p>Hello, <strong>{name || 'Stranger'}</strong>!</p>
                <pre className="code-snippet">
                    {`const [name, setName] = useState('');
<input value={name} onChange={(e) => setName(e.target.value)} />`}
                </pre>
            </div>

            {/* Example 3: Toggle */}
            <div className="example-box">
                <h3>Example 3: Toggle Visibility</h3>
                <button onClick={() => setIsVisible(!isVisible)}>
                    {isVisible ? 'Hide' : 'Show'} Message
                </button>
                {isVisible && <p className="message">👋 Hello! I can be toggled!</p>}
                <pre className="code-snippet">
                    {`const [isVisible, setIsVisible] = useState(true);
setIsVisible(!isVisible); // Toggle boolean`}
                </pre>
            </div>

            <div className="tips-box">
                <h4>💡 Key Points:</h4>
                <ul>
                    <li>Always use functional updates for dependent state</li>
                    <li>State updates are asynchronous</li>
                    <li>Don't mutate state directly</li>
                </ul>
            </div>
        </div>
    );
}

export default UseStateDemo;