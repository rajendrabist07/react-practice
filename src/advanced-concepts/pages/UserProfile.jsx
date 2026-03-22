import { useParams, useNavigate } from 'react-router-dom';

export function UserProfile() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="page">
            <h3>👤 User Profile</h3>
            <p>Viewing user with ID: <strong>{id}</strong></p>
            <button onClick={() => navigate('/products')}>View Products</button>
        </div>
    );
}
