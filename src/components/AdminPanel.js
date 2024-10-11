// components/AdminPanel.js
import { useAuth } from "@/contexts/UserContext";
import { useState, useEffect } from "react";
import RedirectIfNotAuthenticated from "./RedirectIfNotAuthenticated";
import { useRouter } from "next/router";

const AdminPanel = () => {
    const { logout } = useAuth();
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        description: "",
        image: "bike_p8.jpg",
    });

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("/api/products");
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const handleCreateProduct = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/products/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newProduct),
        });
        const data = await response.json();
        if (response.ok) {
            setProducts([...products, data.product]);
            setNewProduct({
                name: "",
                price: "",
                description: "",
                image: "bike_p8.jpg",
            }); // Reset form
        } else {
            alert(data.message);
        }
    };

    const handleDeleteProduct = async (id) => {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/products/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            setProducts(products.filter((product) => product._id !== id));
        }
    };

    return (
        <RedirectIfNotAuthenticated>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Admin Panel
                </h1>
                <button
                    onClick={logout}
                    className="mb-4 text-red-500 hover:text-red-700"
                >
                    Logout
                </button>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                        Add New Product
                    </h2>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    name: e.target.value,
                                })
                            }
                            className="border border-gray-300 p-2 rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    price: e.target.value,
                                })
                            }
                            className="border border-gray-300 p-2 rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    description: e.target.value,
                                })
                            }
                            className="border border-gray-300 p-2 rounded-md"
                        />
                        <button
                            onClick={handleCreateProduct}
                            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Add Product
                        </button>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-2">Product List</h2>
                {products.length > 0 ? (
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr
                                        key={product._id}
                                        className="bg-white border-b"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {product.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            ${product.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() =>
                                                    handleDeleteProduct(
                                                        product._id
                                                    )
                                                }
                                                className="bg-red-600 text-white p-1 rounded-md hover:bg-red-700 transition duration-200"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No products available.</p>
                )}
            </div>
        </RedirectIfNotAuthenticated>
    );
};

export default AdminPanel;
