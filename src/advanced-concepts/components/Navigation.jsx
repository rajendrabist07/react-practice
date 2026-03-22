import { Link } from 'react-router-dom';

export function Navigation() {
    return (
        <nav className="router-nav">
            <Link to="/" className="nav-link">🏠 Home</Link>
            <Link to="/about" className="nav-link">ℹ️ About</Link>
            <Link to="/users/123" className="nav-link">👤 User Profile</Link>
            <Link to="/products" className="nav-link">🛍️ Products</Link>
        </nav>
    );
}
