import MainLayout from "@/components/layouts/MainLayout";
import { useWishlist } from "@/contexts/WishlistContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

    useEffect(() => {
        if (product) {
            setMainImage(product.images[0]);
        }
    }, [product]);

    useEffect(() => {
        if (id) {
            fetch(`/api/products/${id}`)
                .then((res) => res.json())
                .then((data) => setProduct(data))
                .catch((error) =>
                    console.error("Error fetching product:", error)
                );
        }
    }, [id]);

    if (!product) return <div>Loading...</div>;

    const isInWishlist = wishlist.some((item) => item._id === product._id);

    const handleWishlistToggle = () => {
        if (isInWishlist) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <MainLayout>
            <div className="container mx-auto p-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Image Section */}
                    <div className="md:w-1/2">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-96 object-cover rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                        />
                        <div className="grid grid-cols-3 gap-2 mt-4">
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${product.name} - ${index + 1}`}
                                    className="h-20 object-cover rounded cursor-pointer hover:shadow-md transition-shadow duration-300"
                                    onClick={() => setMainImage(image)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="md:w-1/2 space-y-4">
                        <p className="text-2xl font-semibold text-gray-900">
                            {`₫${product.price.toLocaleString()}`}
                        </p>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            {product.name}
                        </h1>
                        <div
                            className="text-gray-600"
                            dangerouslySetInnerHTML={{
                                __html: product.description,
                            }}
                        ></div>
                    </div>
                </div>

                {/* Specifications Section */}
                <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                    Thông số
                </h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {product.specifications.map((spec, index) => (
                        <li key={index}>
                            <strong>{spec.name}:</strong> {spec.value}
                        </li>
                    ))}
                </ul>

                {/* Customer Reviews */}
                <div className="mt-8">
                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-4">
                        <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                            Liên hệ
                        </button>
                        <button className="flex-1 bg-green-600 text-white py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
                            Mua ngay
                        </button>
                        <button
                            className="flex-1 bg-black text-white py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
                            onClick={handleWishlistToggle}
                        >
                            {isInWishlist
                                ? "Remove from Wishlist"
                                : "Add to Wishlist"}
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
