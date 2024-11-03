import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./UserContext";

const WishlistContext = createContext();

export const useWishlist = () => {
    return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState([]);

    console.log("user", user);

    useEffect(() => {
        if (user) {
            // Fetch the user's wishlist from the server
            const fetchWishlist = async () => {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/${user._id}`
                );
                const data = await res.json();
                setWishlist(data);
            };
            fetchWishlist();
        } else {
            // Load wishlist from localStorage for guest users
            const storedWishlist =
                JSON.parse(localStorage.getItem("wishlist")) || [];
            setWishlist(storedWishlist);
        }
    }, [user]);

    const addToWishlist = (product) => {
        const updatedWishlist = [...wishlist, product];
        setWishlist(updatedWishlist);

        if (user) {
            // Save to database for logged-in users
            fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/${user._id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ product }),
                }
            );
        } else {
            // Save to localStorage for guest users
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        }
    };

    const removeFromWishlist = (productId) => {
        const updatedWishlist = wishlist.filter(
            (item) => item._id !== productId
        );
        setWishlist(updatedWishlist);

        if (user) {
            // Remove from database for logged-in users
            fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/${user._id}/${productId}`,
                {
                    method: "DELETE",
                }
            );
        } else {
            // Update localStorage for guest users
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        }
    };

    return (
        <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistContext;
