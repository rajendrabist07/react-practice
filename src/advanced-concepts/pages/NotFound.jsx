import { Link } from 'react-router-dom';

export function NotFound() {
    return (
        <div className="page error-page">
            <h3>❌ 404 - Page Not Found</h3>
            <p>Sorry, the page you're looking for doesn't exist.</p>
            <Link to="/" className="nav-link">Go back home</Link>
        </div>
    );
}
