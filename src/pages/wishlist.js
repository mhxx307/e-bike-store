import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/UserContext";
import { useWishlist } from "@/contexts/WishlistContext";
import MainLayout from "@/components/layouts/MainLayout";

export default function WishlistPage() {
    const { user } = useAuth();
    const { wishlist } = useWishlist(); // Using wishlist from context
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            if (user) {
                // If logged in, fetch wishlist from API
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/${user._id}`
                );
                const data = await res.json();
                setWishlistItems(data);
            } else {
                // If not logged in, load wishlist from local storage
                const storedWishlist =
                    JSON.parse(localStorage.getItem("wishlist")) || [];
                setWishlistItems(storedWishlist);
            }
        };

        fetchWishlist();
    }, [user]);

    const handleRemoveFromWishlist = (productId) => {
        // Remove from local storage or call API to remove
        if (user) {
            // API call to remove item from wishlist
            fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/${user.id}/${productId}`,
                {
                    method: "DELETE",
                }
            ).then(() => {
                // Update the state to remove the product
                setWishlistItems((prev) =>
                    prev.filter((item) => item._id !== productId)
                );
            });
        } else {
            // Update local storage
            const updatedWishlist = wishlistItems.filter(
                (item) => item._id !== productId
            );
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            setWishlistItems(updatedWishlist);
        }
    };

    return (
        <MainLayout>
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
                {wishlistItems.length === 0 ? (
                    <p className="text-gray-700">Your wishlist is empty.</p>
                ) : (
                    <ul className="space-y-4">
                        {wishlistItems.map((product) => (
                            <li
                                key={product._id}
                                className="border p-4 rounded-lg shadow"
                            >
                                <h2 className="text-xl font-semibold">
                                    {product.name}
                                </h2>
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-48 object-cover mb-2"
                                />
                                <p className="text-lg mb-2">{`₫${product.price.toLocaleString()}`}</p>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                                    onClick={() =>
                                        handleRemoveFromWishlist(product._id)
                                    }
                                >
                                    Remove from Wishlist
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </MainLayout>
    );
}
