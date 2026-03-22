import React, { Suspense, useState } from 'react';
import { lazy } from 'react';

const HeavyComponent = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(import('./HeavyComponent.jsx'));
        }, 2000);
    });
});


function LazySuspenseDemo() {
    const [showHeavy, setShowHeavy] = useState(false);
    return (
        <>
            <div className='Concept-container'>
                <h2>⚡ Lazy Loading & Suspense</h2>
                <p className="description">
                    Code splitting allows you to split your app into smaller chunks and
                    load them on demand, improving initial load time.
                </p>

                <button onClick={() => setShowHeavy(!showHeavy)}>
                    {showHeavy ? "Hide" : "Load"} Heavy Component
                </button>

                {showHeavy && (
                    <Suspense fallback={
                        <div className="loading-box">
                            <div className="spinner"></div>
                            <p>Loading Component...</p>
                        </div>
                    }>
                        <HeavyComponent />
                    </Suspense>
                )}

                <pre className='code-snippet'>
                    {`import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div>
      <button onClick={() => setShowHeavy(!showHeavy)}>
        {showHeavy ? "Hide" : "Load"} Heavy Component
      </button>

      {showHeavy && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}`}
                </pre>
            </div>

            <div className="tips-box">
                <h3>💡 Tips for Lazy Loading:</h3>
                <ul>
                    <li>Use lazy loading for components that are not needed immediately.</li>
                    <li>Implement a fallback UI while the lazy component is loading.</li>
                    <li>Consider using code splitting to reduce the initial bundle size.</li>
                </ul>
            </div>
        </>
    );
}

export default LazySuspenseDemo;
