import React, { useEffect, useMemo, useState } from "react";
import "./API.css";

const API_BASE = "https://dummyjson.com/products";

const sanitizeNumber = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
};

const APIs = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(new Set());

    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        description: "",
    });

    const [editing, setEditing] = useState(null);
    const [editValues, setEditValues] = useState({
        title: "",
        price: "",
        description: "",
    });

    const [lastDeleted, setLastDeleted] = useState(null);
    const [bulkDelta, setBulkDelta] = useState(0);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError("");

            try {
                const skip = (page - 1) * limit;
                const response = await fetch(`${API_BASE}?limit=${limit}&skip=${skip}`);
                const result = await response.json();
                setProducts(result.products || []);
            } catch (err) {
                setError("Unable to load products. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [page, limit]);

    const visibleProducts = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return products;
        return products.filter((p) =>
            [p.title, p.description, p.category].some((field) =>
                String(field).toLowerCase().includes(q)
            )
        );
    }, [products, search]);

    const addProduct = async () => {
        const payload = {
            title: newProduct.title.trim() || "New product",
            price: sanitizeNumber(newProduct.price) || 1,
            description: newProduct.description.trim() || "A shiny new item.",
            category: "electronics",
        };

        try {
            const response = await fetch(`${API_BASE}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            setProducts((prev) => [result, ...prev]);
            setNewProduct({ title: "", price: "", description: "" });
        } catch (err) {
            console.error(err);
            setError("Unable to add product. Try again.");
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
            const result = await response.json();
            setLastDeleted(result);
            setProducts((prev) => prev.filter((p) => p.id !== Number(id)));
        } catch (err) {
            console.error(err);
            setError("Unable to delete product.");
        }
    };

    const undoDelete = async () => {
        if (!lastDeleted) return;

        try {
            const response = await fetch(`${API_BASE}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: lastDeleted.title,
                    price: lastDeleted.price,
                    description: lastDeleted.description,
                    category: lastDeleted.category || "electronics",
                }),
            });

            const result = await response.json();
            setProducts((prev) => [result, ...prev]);
            setLastDeleted(null);
        } catch (err) {
            console.error(err);
            setError("Unable to restore product.");
        }
    };

    const startEditing = (product) => {
        setEditing(product.id);
        setEditValues({
            title: product.title,
            price: product.price,
            description: product.description,
        });
    };

    const cancelEditing = () => {
        setEditing(null);
        setEditValues({ title: "", price: "", description: "" });
    };

    const saveEdit = async () => {
        if (!editing) return;

        const payload = {
            title: editValues.title.trim(),
            price: sanitizeNumber(editValues.price),
            description: editValues.description.trim(),
        };

        try {
            const response = await fetch(`${API_BASE}/${editing}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await response.json();

            setProducts((prev) =>
                prev.map((p) => (p.id === editing ? { ...p, ...result } : p))
            );

            cancelEditing();
        } catch (err) {
            console.error(err);
            setError("Unable to update product.");
        }
    };

    const replaceProduct = async (product) => {
        const payload = {
            title: product.title,
            price: product.price,
            description: product.description,
            brand: product.brand || "Generic",
            category: product.category || "electronics",
        };

        try {
            const response = await fetch(`${API_BASE}/${product.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await response.json();

            setProducts((prev) =>
                prev.map((p) => (p.id === product.id ? { ...p, ...result } : p))
            );
        } catch (err) {
            console.error(err);
            setError("Unable to replace product.");
        }
    };

    const toggleSelect = (id) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const applyBulkPriceChange = async () => {
        const delta = sanitizeNumber(bulkDelta);
        if (!delta || selected.size === 0) return;

        const updates = Array.from(selected).map(async (id) => {
            const product = products.find((p) => p.id === id);
            if (!product) return null;

            const newPrice = Math.max(1, product.price + delta);
            try {
                const response = await fetch(`${API_BASE}/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ price: newPrice }),
                });
                const result = await response.json();
                return { id, price: result.price };
            } catch (err) {
                console.error(err);
                return null;
            }
        });

        const results = await Promise.all(updates);
        setProducts((prev) =>
            prev.map((p) => {
                const updated = results.find((r) => r?.id === p.id);
                return updated ? { ...p, price: updated.price } : p;
            })
        );
    };

    return (
        <div className="ui-container">
            <header style={{ textAlign: "center", marginBottom: 24 }}>
                <h1>Products Dashboard</h1>
                <p style={{ maxWidth: 650, margin: "0 auto" }}>
                    This demo uses dummyjson.com to show full CRUD flows on products.
                    Create, update, delete, patch and bulk-edit right from the browser.
                </p>
            </header>

            <section className="ui-form">
                <input
                    value={newProduct.title}
                    placeholder="New product title"
                    onChange={(e) =>
                        setNewProduct((prev) => ({ ...prev, title: e.target.value }))
                    }
                />
                <input
                    value={newProduct.price}
                    placeholder="Price"
                    type="number"
                    onChange={(e) =>
                        setNewProduct((prev) => ({ ...prev, price: e.target.value }))
                    }
                />
                <input
                    value={newProduct.description}
                    placeholder="Description"
                    onChange={(e) =>
                        setNewProduct((prev) => ({ ...prev, description: e.target.value }))
                    }
                />
                <button onClick={addProduct}>Create product (POST)</button>
            </section>

            <section className="ui-form" style={{ gap: "16px" }}>
                <input
                    value={search}
                    placeholder="Search products..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <input
                    value={bulkDelta}
                    placeholder="Bulk price delta"
                    type="number"
                    onChange={(e) => setBulkDelta(e.target.value)}
                />
                <button
                    onClick={applyBulkPriceChange}
                    disabled={!selected.size || !bulkDelta}
                >
                    Apply to selected (PATCH)
                </button>
                {lastDeleted && (
                    <button onClick={undoDelete} style={{ background: "#2d8f4c" }}>
                        Undo delete
                    </button>
                )}
            </section>

            <div className="ui-controls">
                <div>
                    <label>
                        Page:&nbsp;
                        <select value={page} onChange={(e) => setPage(Number(e.target.value))}>
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
                                <option key={val} value={val}>
                                    {val}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div>
                    <label>
                        Per page:&nbsp;
                        <select
                            value={limit}
                            onChange={(e) => {
                                setLimit(Number(e.target.value));
                                setPage(1);
                            }}
                        >
                            {[6, 12, 24, 50].map((val) => (
                                <option key={val} value={val}>
                                    {val}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="ui-pagination">
                    <button
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span>Page {page}</span>
                    <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
                </div>
            </div>

            {loading && <p style={{ textAlign: "center" }}>Loading…</p>}
            {error && (
                <p style={{ textAlign: "center", color: "#b00020" }}>{error}</p>
            )}

            <div className="ui-grid">
                {visibleProducts.map((product) => {
                    const isEditing = editing === product.id;
                    const isSelected = selected.has(product.id);

                    return (
                        <div className="ui-card" key={product.id}>
                            <div className="ui-img">
                                <img
                                    src={product.images?.[0] || "https://via.placeholder.com/400"}
                                    alt={product.title}
                                />
                            </div>

                            <div className="ui-content">
                                <div className="product-meta">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => toggleSelect(product.id)}
                                        />
                                        Select
                                    </label>

                                    <span className="price-tag">${product.price}</span>
                                </div>

                                {isEditing ? (
                                    <div className="inline-edit">
                                        <input
                                            value={editValues.title}
                                            onChange={(e) =>
                                                setEditValues((prev) => ({
                                                    ...prev,
                                                    title: e.target.value,
                                                }))
                                            }
                                        />
                                        <input
                                            type="number"
                                            value={editValues.price}
                                            onChange={(e) =>
                                                setEditValues((prev) => ({
                                                    ...prev,
                                                    price: e.target.value,
                                                }))
                                            }
                                        />
                                        <textarea
                                            rows={2}
                                            value={editValues.description}
                                            onChange={(e) =>
                                                setEditValues((prev) => ({
                                                    ...prev,
                                                    description: e.target.value,
                                                }))
                                            }
                                        />

                                        <div className="button-row">
                                            <button onClick={saveEdit}>Save (PATCH)</button>
                                            <button
                                                onClick={cancelEditing}
                                                style={{ background: "#999" }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h3>{product.title}</h3>
                                        <p>{product.description}</p>
                                        <p className="meta">
                                            <strong>Category:</strong> {product.category}
                                        </p>
                                        <div className="button-row">
                                            <button onClick={() => startEditing(product)}>
                                                Edit (PATCH)
                                            </button>
                                            <button
                                                onClick={() => replaceProduct(product)}
                                                style={{ background: "#f8b400" }}
                                            >
                                                Replace (PUT)
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                style={{ background: "#d32f2f" }}
                                            >
                                                Delete (DELETE)
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <footer style={{ textAlign: "center", marginTop: 24 }}>
                <small>
                    Tip: Use the search box to filter products and the checkbox to select
                    items for bulk PATCH updates.
                </small>
            </footer>
        </div>
    );
};

export default APIs;
