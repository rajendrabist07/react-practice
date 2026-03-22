import { useState } from 'react';

function APIFetchDemo() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="concept-container">
            <h2>🌐 API Fetch</h2>
            <p className="description">
                Learn how to fetch data from APIs using fetch() with async/await.
            </p>

            <div className="example-box">
                <button
                    onClick={fetchUsers}
                    disabled={loading}
                    className="fetch-btn"
                >
                    {loading ? 'Loading...' : 'Fetch Users'}
                </button>

                {loading && (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Loading users...</p>
                    </div>
                )}

                {error && (
                    <div className="error-box">
                        ❌ Error: {error}
                    </div>
                )}

                {users.length > 0 && (
                    <div className="users-grid">
                        {users.map(user => (
                            <div key={user.id} className="user-card">
                                <h4>{user.name}</h4>
                                <p>📧 {user.email}</p>
                                <p>🏢 {user.company.name}</p>
                                <p>🌍 {user.address.city}</p>
                            </div>
                        ))}
                    </div>
                )}

                <pre className="code-snippet">
                    {`const fetchUsers = async () => {
  setLoading(true);
  try {
    const response = await fetch(url);
    const data = await response.json();
    setUsers(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};`}
                </pre>
            </div>

            <div className="tips-box">
                <h4>💡 Best Practices:</h4>
                <ul>
                    <li>Always handle loading state</li>
                    <li>Always handle errors</li>
                    <li>Use try-catch with async/await</li>
                    <li>Show user feedback</li>
                </ul>
            </div>
        </div>
    );
}

export default APIFetchDemo;