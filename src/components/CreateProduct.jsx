import React, { useEffect, useState } from "react";
import "./CreateProduct.css";

const CreateProduct = () => {
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(5);
    const [index, setIndex] = useState(0);

    const fetchData = async () => {
        const response = await fetch(
            `https://dummyjson.com/products?limit=${limit}`
        );
        const result = await response.json();
        setProducts(result.products);
        setIndex(0);
    };

    useEffect(() => {
        fetchData();
    }, [limit]);

    const nextProduct = () => {
        if (index < products.length - 1) {
            setIndex(index + 1);
        }
    };

    const prevProduct = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const product = products[index];

    return (
        <div className="pv-container">
            {product && (
                <div className="pv-card">
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="pv-image"
                    />

                    <div className="pv-content">
                        <h2>{product.title}</h2>
                        <p className="pv-category">Category: {product.category}</p>
                        <p className="pv-description">{product.description}</p>
                        <p className="pv-price">Price: ${product.price}</p>
                    </div>

                    <div className="pv-buttons">
                        <button onClick={prevProduct}>Previous</button>
                        <button onClick={nextProduct}>Next</button>
                    </div>
                </div>
            )}

            <div className="pv-select">
                <label>Load Products: </label>
                <select value={limit} onChange={(e) => setLimit(e.target.value)}>
                    <option value={1}>1</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                </select>
            </div>
        </div>
    );
};

export default CreateProduct;