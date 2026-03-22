import { useNavigate } from 'react-router-dom';

export function ProductsPage() {
    const navigate = useNavigate();
    const products = [1, 2, 3, 4, 5];

    return (
        <div className="page">
            <h3>🛍️ Products Page</h3>
            <div className="products-list">
                {products.map(id => (
                    <button
                        key={id}
                        onClick={() => navigate(`/products/${id}`)}
                        className="product-btn"
                    >
                        Product {id}
                    </button>
                ))}
            </div>
        </div>
    );
}
