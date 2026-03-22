import { useReducer } from 'react';


// Reducer function
const counterReducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'DECREMENT':
            return { count: state.count - 1 };
        case 'RESET':
            return { count: 0 };
        case 'SET':
            return { count: action.payload };
        default:
            return state;
    }
};

function UseReducerDemo() {
    const [state, dispatch] = useReducer(counterReducer, { count: 0 });

    return (
        <div className="concept-container">
            <h2>🔄 useReducer Hook</h2>
            <p className="description">
                useReducer is an alternative to useState for complex state logic.
                Think of it as useState + Redux pattern.
            </p>

            <div className="example-box">
                <h3>Counter with Reducer</h3>
                <div className="count-large">{state.count}</div>

                <div className="button-group">
                    <button onClick={() => dispatch({ type: 'INCREMENT' })}>
                        +1
                    </button>
                    <button onClick={() => dispatch({ type: 'DECREMENT' })}>
                        -1
                    </button>
                    <button onClick={() => dispatch({ type: 'RESET' })}>
                        Reset
                    </button>
                    <button onClick={() => dispatch({ type: 'SET', payload: 100 })}>
                        Set to 100
                    </button>
                </div>

                <pre className="code-snippet">
                    {`const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'INCREMENT' });`}
                </pre>
            </div>

            <div className="tips-box">
                <h4>💡 useState vs useReducer:</h4>
                <ul>
                    <li>useState: Simple state (1-2 values)</li>
                    <li>useReducer: Complex state, multiple actions</li>
                    <li>useReducer: When next state depends on previous</li>
                </ul>
            </div>
        </div>
    );
}

export default UseReducerDemo;