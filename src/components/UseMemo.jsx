import { useState, useMemo } from 'react';


function UseMemoDemo() {
    const [count, setCount] = useState(0);
    const [toggle, setToggle] = useState(false);

    // Expensive calculation WITHOUT useMemo
    const expensiveCalculation = () => {
        console.log('💰 Calculating...');
        let sum = 0;
        for (let i = 0; i < 1000000000; i++) {
            sum += i;
        }
        return sum;
    };

    // Expensive calculation WITH useMemo
    const memoizedValue = useMemo(() => {
        console.log('✅ Memoized calculation running...');
        let sum = 0;
        for (let i = 0; i < count * 1000; i++) {
            sum += i;
        }
        return sum;
    }, [count]);

    return (
        <div className="concept-container">
            <h2>🧠 useMemo Hook</h2>
            <p className="description">
                useMemo caches expensive calculations and only recalculates when
                dependencies change. Boosts performance!
            </p>

            <div className="example-box">
                <h3>Performance Comparison</h3>

                <div className="stats-row">
                    <div className="stat-card">
                        <h4>Count</h4>
                        <p className="big-number">{count}</p>
                    </div>
                    <div className="stat-card">
                        <h4>Memoized Result</h4>
                        <p className="big-number">{memoizedValue.toLocaleString()}</p>
                    </div>
                </div>

                <div className="button-group">
                    <button onClick={() => setCount(count + 1)}>
                        Increment Count
                    </button>
                    <button onClick={() => setToggle(!toggle)}>
                        Toggle ({toggle ? 'ON' : 'OFF'})
                    </button>
                </div>

                <p className="info-text">
                    Check console! Memoized calculation only runs when count changes,
                    NOT when toggle changes!
                </p>

                <pre className="code-snippet">
                    {`const memoizedValue = useMemo(() => {
  // Expensive calculation
  return heavyCalculation(input);
}, [input]); // Only recalculates when input changes`}
                </pre>
            </div>

            <div className="tips-box">
                <h4>💡 When to use useMemo:</h4>
                <ul>
                    <li>Expensive calculations</li>
                    <li>Large data filtering/sorting</li>
                    <li>Prevent unnecessary re-renders</li>
                </ul>
            </div>
        </div>
    );
}

export default UseMemoDemo;