// components/ProductTypeManager.js
import { useState, useEffect } from "react";

const ProductTypeManager = () => {
    const [productTypes, setProductTypes] = useState([]);
    const [newType, setNewType] = useState("");
    const [editType, setEditType] = useState(null);
    const [deleteTypeId, setDeleteTypeId] = useState(null); // State to store the ID of the type to be deleted

    useEffect(() => {
        fetchProductTypes();
    }, []);

    const fetchProductTypes = async () => {
        const response = await fetch("/api/product-types");
        const data = await response.json();
        setProductTypes(data);
    };

    const handleAddType = async () => {
        const response = await fetch("/api/product-types", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newType }),
        });
        if (response.ok) {
            fetchProductTypes();
            setNewType("");
        }
    };

    const handleDeleteType = async () => {
        if (!deleteTypeId) return;

        const response = await fetch(`/api/product-types/${deleteTypeId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            fetchProductTypes();
            setDeleteTypeId(null);
        }
    };

    const handleUpdateType = async (id) => {
        const response = await fetch(`/api/product-types/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: editType.name }),
        });
        if (response.ok) {
            fetchProductTypes();
            setEditType(null);
        }
    };

    const handleCancelEdit = () => {
        setEditType(null);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
            <input
                type="text"
                placeholder="New Product Type"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="border border-gray-300 p-2 rounded-l w-full mb-4"
            />
            <button
                onClick={handleAddType}
                className="bg-blue-500 text-white p-2 rounded-r w-full hover:bg-blue-600 transition duration-200"
            >
                Add Product Type
            </button>

            <ul className="mt-4 space-y-2">
                {productTypes.map((type) => (
                    <li
                        key={type._id}
                        className="flex items-center justify-between p-3 bg-gray-100 rounded shadow-sm"
                    >
                        {editType?.id === type._id ? (
                            <>
                                <input
                                    value={editType.name}
                                    onChange={(e) =>
                                        setEditType({
                                            ...editType,
                                            name: e.target.value,
                                        })
                                    }
                                    className="border border-gray-300 p-2 rounded w-full mr-2"
                                />
                                <button
                                    onClick={() => handleUpdateType(type._id)}
                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-200"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="text-gray-700 text-lg">
                                    {type.name}
                                </span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() =>
                                            setEditType({
                                                id: type._id,
                                                name: type.name,
                                            })
                                        }
                                        className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-200"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            setDeleteTypeId(type._id)
                                        }
                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {/* Confirmation Dialog */}
            {deleteTypeId && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">
                            Confirm Delete
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete this product type?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setDeleteTypeId(null)}
                                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteType}
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductTypeManager;
