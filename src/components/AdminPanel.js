// components/AdminPanel.js
"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/UserContext";
import RedirectIfNotAuthenticated from "./RedirectIfNotAuthenticated";
import ProductTypeManager from "./ProductTypeManager";
import { formatCurrencyNumberWithDecimal, isNumeric } from "@/utils/helper";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { CldImage } from "next-cloudinary";

const AdminPanel = () => {
    const { logout } = useAuth();
    const [products, setProducts] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        description: "",
        images: [],
        specifications: [],
        productType: "",
    });
    const [specification, setSpecification] = useState({ name: "", value: "" });
    const [isProductTypeDialogOpen, setProductTypeDialogOpen] = useState(false); // Toggle for product type modal
    const [isProductFormOpen, setProductFormOpen] = useState(false); // Toggle for product form modal
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("/api/products");
            const data = await response.json();
            setProducts(data);
        };
        const fetchProductTypes = async () => {
            const response = await fetch("/api/product-types");
            const data = await response.json();
            setProductTypes(data);
        };

        fetchProducts();
        fetchProductTypes();
    }, []);

    const handleAddSpecification = () => {
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            specifications: [...prevProduct.specifications, specification],
        }));
        setSpecification({ name: "", value: "" });
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setImageFiles(files);
        // Generate previews for UI display
        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleCreateProduct = async () => {
        // Convert images to base64
        const fileReaders = imageFiles.map((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onloadend = () => resolve(reader.result);
            });
        });

        const images = await Promise.all(fileReaders);

        // Upload images and create product
        const token = localStorage.getItem("token");
        const uploadResponse = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ images }),
        });

        const uploadData = await uploadResponse.json();
        if (!uploadResponse.ok) {
            alert("Image upload failed");
            return;
        }

        const response = await fetch("/api/products/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...newProduct,
                images: uploadData.urls,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            setProducts([...products, data.product]);
            setNewProduct({
                name: "",
                price: "",
                description: "",
                images: [],
                specifications: [],
                productType: "",
            });
            setImagePreviews([]);
            setImageFiles([]);
            setProductFormOpen(false);
        } else {
            alert(data.message);
        }
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (isNumeric(value) || value === "") {
            setNewProduct({
                ...newProduct,
                price: value,
            });
        }
    };

    const handleDeleteProduct = async (id) => {
        const confirmDelete = window.confirm(
            "Bạn có chắc chắn muốn xóa sản phẩm này?"
        ); // Confirmation dialog
        if (!confirmDelete) return; // Exit if the user cancels

        const token = localStorage.getItem("token");
        const response = await fetch(`/api/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            setProducts(products.filter((product) => product._id !== id));
        } else {
            alert("Failed to delete product");
        }
    };

    const handleDeleteSpecification = (index) => {
        setNewProduct((prevProduct) => {
            const updatedSpecifications = prevProduct.specifications.filter(
                (_, i) => i !== index
            );
            return { ...prevProduct, specifications: updatedSpecifications };
        });
    };

    return (
        <RedirectIfNotAuthenticated>
            <div className="p-6 sm:p-8 bg-gray-100 rounded-lg shadow-md sm:h-auto h-full min-h-screen flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
                    Bảng Quản Trị
                </h1>
                <button
                    onClick={logout}
                    className="mb-6 text-red-600 hover:text-red-800 transition duration-200 font-semibold"
                >
                    Đăng Xuất
                </button>

                {/* Button to open the product form modal */}
                <button
                    onClick={() => setProductFormOpen(true)}
                    className="bg-blue-600 text-white p-3 rounded-md mb-8 hover:bg-blue-700 transition duration-200"
                >
                    Tạo Sản Phẩm Mới
                </button>

                {/* Product List in Grid Layout */}
                <div className="w-full max-w-7xl mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product._id}
                                className="border border-gray-300 p-4 rounded-md shadow-sm"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-bold">
                                        {product.name}
                                    </h3>
                                    <span className="text-gray-600">
                                        {formatCurrencyNumberWithDecimal(
                                            product.price
                                        )}
                                    </span>
                                </div>
                                <div className="flex space-x-2 mb-2">
                                    {product.images.map((url, index) => (
                                        <CldImage
                                            key={index}
                                            src={url}
                                            alt={`Product Image ${index + 1}`}
                                            width={50}
                                            height={50}
                                            className="rounded-md"
                                        />
                                    ))}
                                </div>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: product.description,
                                    }}
                                    className="text-gray-700 mb-2"
                                />
                                {/* Display Specifications */}
                                <ul className="text-sm text-gray-600 mb-2">
                                    {product.specifications.map(
                                        (spec, index) => (
                                            <li key={index}>
                                                {spec.name}: {spec.value}
                                            </li>
                                        )
                                    )}
                                </ul>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() =>
                                            handleDeleteProduct(product._id)
                                        }
                                        className="bg-red-600 text-white p-[7px] rounded-md hover:bg-red-700 transition duration-200 w-full text-xs"
                                    >
                                        Xóa Sản Phẩm
                                    </button>

                                    <button
                                        onClick={() => {}}
                                        className="bg-green-600 text-white p-[7px] rounded-md hover:bg-green-700 transition duration-200 w-full text-xs"
                                    >
                                        Cập nhật
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 col-span-full text-center">
                            Hiện chưa có sản phẩm nào.
                        </p>
                    )}
                </div>

                {/* Product Creation Form Modal */}
                {isProductFormOpen && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 max-w-lg overflow-y-auto max-h-[90vh]">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                Thêm Sản Phẩm Mới
                            </h2>

                            <input
                                type="text"
                                placeholder="Tên Sản Phẩm"
                                value={newProduct.name}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        name: e.target.value,
                                    })
                                }
                                className="border border-gray-300 p-3 rounded-md mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Giá"
                                value={newProduct.price}
                                onChange={handlePriceChange}
                                className="border border-gray-300 p-3 rounded-md mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <ReactQuill
                                theme="snow"
                                value={newProduct.description}
                                onChange={(value) =>
                                    setNewProduct({
                                        ...newProduct,
                                        description: value,
                                    })
                                }
                                className="border border-gray-300 rounded-md mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                className="border border-gray-300 p-2 rounded-md"
                            />

                            {/* Preview Selected Images */}
                            <div className="flex mt-2 space-x-2">
                                {imagePreviews.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`Product Image Preview ${
                                            index + 1
                                        }`}
                                        className="rounded-md"
                                        width={100}
                                        height={100}
                                    />
                                ))}
                            </div>

                            {/* Product Type Selection with Management */}
                            <div className="flex items-center mb-4 space-x-2">
                                <select
                                    value={newProduct.productType}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            productType: e.target.value,
                                        })
                                    }
                                    className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Chọn Loại Sản Phẩm</option>
                                    {productTypes.map((type) => (
                                        <option key={type._id} value={type._id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() =>
                                        setProductTypeDialogOpen(true)
                                    }
                                    className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                                >
                                    Quản Lý Loại
                                </button>
                            </div>

                            {/* Specifications Section */}
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Thông Số Kỹ Thuật
                                </h3>
                                <input
                                    type="text"
                                    placeholder="Tên Thông Số"
                                    value={specification.name}
                                    onChange={(e) =>
                                        setSpecification({
                                            ...specification,
                                            name: e.target.value,
                                        })
                                    }
                                    className="border border-gray-300 p-3 rounded-md mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Giá Trị Thông Số"
                                    value={specification.value}
                                    onChange={(e) =>
                                        setSpecification({
                                            ...specification,
                                            value: e.target.value,
                                        })
                                    }
                                    className="border border-gray-300 p-3 rounded-md mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={handleAddSpecification}
                                    className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 w-full"
                                >
                                    Thêm Thông Số
                                </button>

                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        Danh Sách Thông Số
                                    </h3>
                                    {newProduct.specifications.map(
                                        (spec, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between border-b border-gray-300 p-3 rounded-md mb-2"
                                            >
                                                <div className="flex space-x-4">
                                                    <p className="text-gray-600">
                                                        {spec.name}:
                                                    </p>
                                                    <p className="text-gray-600">
                                                        {spec.value}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteSpecification(
                                                            index
                                                        )
                                                    }
                                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={handleCreateProduct}
                                className="bg-green-600 text-white p-3 rounded-md mt-4 w-full hover:bg-green-700 transition duration-200"
                            >
                                Thêm Sản Phẩm
                            </button>
                            <button
                                onClick={() => setProductFormOpen(false)}
                                className="mt-4 p-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 w-full"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                )}

                {/* Product Type Management Dialog */}
                {isProductTypeDialogOpen && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 max-w-lg">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                Quản Lý Loại Sản Phẩm
                            </h2>
                            <ProductTypeManager />
                            <button
                                onClick={() => setProductTypeDialogOpen(false)}
                                className="mt-4 p-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 w-full"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </RedirectIfNotAuthenticated>
    );
};

export default AdminPanel;
