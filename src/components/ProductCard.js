import { useWishlist } from "@/contexts/WishlistContext";
import { formatPrice } from "@/utils/helper";
import Link from "next/link";
import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

function ProductCard({ product }) {
    const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

    const isInWishlist = wishlist.some((item) => item._id === product._id);

    const handleWishlistToggle = () => {
        if (isInWishlist) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div className="border p-4 rounded-lg shadow-lg relative">
            {/* Wishlist Icon */}
            <div
                onClick={handleWishlistToggle}
                className="absolute top-2 right-2 cursor-pointer text-yellow-500"
                title={
                    isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"
                }
            >
                {isInWishlist ? <FaStar size={24} /> : <FaRegStar size={24} />}
            </div>

            <img
                src={product.images[0]}
                alt="E-Bike"
                className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-medium">{product.name}</h3>
            <p className="text-gray-600 mb-4">{formatPrice(product.price)}</p>

            <div className="mb-4 space-x-2">
                <Link
                    href={`/products/${product._id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded text-sm"
                >
                    Chi tiết
                </Link>

                <Link
                    href={"/contact-payment"}
                    className="bg-green-500 text-white px-4 py-2 rounded text-sm"
                >
                    Liên hệ
                </Link>

                <Link
                    href={"/contact-payment"}
                    className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
                >
                    Mua hàng
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;
