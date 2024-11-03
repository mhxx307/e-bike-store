import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

// components/ProductList.js
export default function ProductList() {
    const [products, setProducts] = useState([]);
    // const { addToCart } = useCart();

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
                    <ProductCard product={product} key={product._id} />
                ))}
            </div>
        </div>
    );
}
