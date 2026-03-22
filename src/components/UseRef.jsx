import { useRef, useState } from 'react';


function UseRefDemo() {
    const inputRef = useRef(null);
    const countRef = useRef(0);
    const [renderCount, setRenderCount] = useState(0);

    const handleFocus = () => {
        inputRef.current.focus();
        inputRef.current.style.background = 'yellow';
    };

    const incrementRef = () => {
        countRef.current += 1;
        alert(`Ref count: ${countRef.current} (No re-render!)`);
    };

    return (
        <div className="concept-container">
            <h2>📌 useRef Hook</h2>
            <p className="description">
                useRef returns a mutable object that persists across renders.
                Perfect for DOM access and storing values without re-rendering.
            </p>

            {/* Example 1: DOM Access */}
            <div className="example-box">
                <h3>Example 1: Focus Input</h3>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Click button to focus me"
                    className="demo-input"
                />
                <button onClick={handleFocus}>Focus Input</button>

                <pre className="code-snippet">
                    {`const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus(); // Access DOM`}
                </pre>
            </div>

            {/* Example 2: Persistent Value */}
            <div className="example-box">
                <h3>Example 2: Value without Re-render</h3>
                <p>Ref count: {countRef.current}</p>
                <button onClick={incrementRef}>Increment Ref</button>
                <button onClick={() => setRenderCount(renderCount + 1)}>
                    Force Re-render ({renderCount})
                </button>

                <pre className="code-snippet">
                    {`const countRef = useRef(0);
countRef.current += 1; // No re-render!`}
                </pre>
            </div>

            <div className="tips-box">
                <h4>💡 useRef vs useState:</h4>
                <ul>
                    <li>useRef: No re-render when value changes</li>
                    <li>useState: Triggers re-render</li>
                    <li>useRef: Access DOM elements</li>
                </ul>
            </div>
        </div>
    );
}

export default UseRefDemo;