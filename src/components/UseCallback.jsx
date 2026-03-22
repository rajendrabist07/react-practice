import { useState, useCallback, memo } from 'react';


// Child component wrapped in memo
const ChildComponent = memo(({ onClick, name }) => {
    console.log(`${name} rendered!`);

    return (
        <div className="child-box">
            <p>{name}</p>
            <button onClick={onClick}>Click Me</button>
        </div>
    );
});

function UseCallbackDemo() {
    const [count, setCount] = useState(0);
    const [otherState, setOtherState] = useState(0);

    // WITHOUT useCallback - creates new function every render
    const handleClickBad = () => {
        console.log('Clicked!');
    };

    // WITH useCallback - same function reference
    const handleClickGood = useCallback(() => {
        console.log('Clicked! Count:', count);
    }, [count]);

    return (
        <div className="concept-container">
            <h2>🔗 useCallback Hook</h2>
            <p className="description">
                useCallback returns a memoized function. Prevents unnecessary
                re-renders of child components.
            </p>

            <div className="example-box">
                <h3>Component Re-render Test</h3>

                <div className="stats-row">
                    <div className="stat-card">
                        <h4>Count</h4>
                        <p className="big-number">{count}</p>
                        <button onClick={() => setCount(count + 1)}>+1</button>
                    </div>
                    <div className="stat-card">
                        <h4>Other State</h4>
                        <p className="big-number">{otherState}</p>
                        <button onClick={() => setOtherState(otherState + 1)}>+1</button>
                    </div>
                </div>

                <div className="children-container">
                    <ChildComponent
                        onClick={handleClickBad}
                        name="Child 1 (No useCallback)"
                    />
                    <ChildComponent
                        onClick={handleClickGood}
                        name="Child 2 (With useCallback)"
                    />
                </div>

                <p className="info-text">
                    Click "Other State" and check console. Child 1 re-renders,
                    Child 2 doesn't (unless count changes)!
                </p>

                <pre className="code-snippet">
                    {`const memoizedFn = useCallback(() => {
  doSomething(a, b);
}, [a, b]); // Only creates new function when a or b changes`}
                </pre>
            </div>

            <div className="tips-box">
                <h4>💡 useMemo vs useCallback:</h4>
                <ul>
                    <li>useMemo: Returns memoized VALUE</li>
                    <li>useCallback: Returns memoized FUNCTION</li>
                    <li>Both prevent unnecessary calculations/renders</li>
                </ul>
            </div>
        </div>
    );
}

export default UseCallbackDemo;