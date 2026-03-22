import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './advanced.css';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { UserProfile } from './pages/UserProfile';
import { ProductsPage } from './pages/ProductsPage';
import { NotFound } from './pages/NotFound';

// Layout Component
function RouterLayout() {
    return (
        <div className="concept-container">
            <h2>🛣️ React Router - SPA Navigation</h2>
            <p className="description">
                Navigate between different pages in your React app without page reload (Single Page Application).
            </p>

            <div className="example-box">
                <h3>Navigation Example</h3>

                {/* Navigation Component */}
                <Navigation />

                {/* Routes Content */}
                <div className="route-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/users/:id" element={<UserProfile />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>

                <pre className="code-snippet">
                    {`// Installation: npm install react-router-dom

import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users/123">Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Use in components:
function HomePage() {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/about')}>Go to About</button>;
}

function UserProfile() {
  const { id } = useParams();
  return <h2>User {id}</h2>;
}`}
                </pre>
            </div>

            <div className="tips-box">
                <h4>💡 Key Concepts:</h4>
                <ul>
                    <li><code>BrowserRouter</code> - Wraps your entire app, enables routing</li>
                    <li><code>Routes</code> - Container for all route definitions</li>
                    <li><code>Route</code> - Maps URL path to component (path + element)</li>
                    <li><code>Link</code> - Navigate without page reload</li>
                    <li><code>useNavigate()</code> - Programmatic navigation hook</li>
                    <li><code>useParams()</code> - Extract URL parameters (e.g., :id)</li>
                    <li><code>path="*"</code> - Catch-all route for 404 pages</li>
                </ul>
            </div>

            <div className="tips-box">
                <h4>🎯 Best Practices:</h4>
                <ul>
                    <li>Keep BrowserRouter at the top level of your app</li>
                    <li>Use Link for navigation (prevents page reload)</li>
                    <li>Use useNavigate() for programmatic navigation</li>
                    <li>Always have a 404 page with path="*"</li>
                    <li>Organize pages in a /pages folder</li>
                    <li>Use URL parameters for dynamic routes (/users/:id)</li>
                </ul>
            </div>
        </div>
    );
}

function ReactRouterDemo() {
    return (
        <BrowserRouter>
            <RouterLayout />
        </BrowserRouter>
    );
}

export default ReactRouterDemo;