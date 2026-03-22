import { useNavigate } from 'react-router-dom';

export function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="page">
            <h3>🏠 Home Page</h3>
            <p>Welcome to the home page!</p>
            <button onClick={() => navigate('/about')}>Go to About</button>
        </div>
    );
}
