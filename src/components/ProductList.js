import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";

// components/ProductList.js
export default function ProductList() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto py-8 px-4">
            <h2 className="text-2xl font-bold mb-4">Sản phẩm nổi bật</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Repeat for more products */}
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="border p-4 rounded-lg shadow-lg"
                    >
                        <img
                            src="/bike_p8.jpg"
                            alt="E-Bike"
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-lg font-medium">{product.name}</h3>
                        {/* <p className="text-gray-600">{product.description}</p> */}
                        <p className="text-gray-600">{product.price} VND</p>

                        <input
                            type="number"
                            min="1"
                            defaultValue={1}
                            id={`quantity-${product._id}`}
                            className="w-16 text-center border rounded"
                        />

                        <button
                            onClick={() => {
                                const quantity = document.getElementById(
                                    `quantity-${product._id}`
                                ).value;
                                addToCart(product, parseInt(quantity));
                            }}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Thêm vào giỏ hàng
                        </button>

                        <Link
                            href={"/contact-payment"}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Liên hệ để mua
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
