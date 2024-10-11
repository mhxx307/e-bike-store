// pages/cart.js
import MainLayout from "@/components/layouts/MainLayout";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react"; // Import useState for managing messages

// Helper function to format prices
const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

const Cart = () => {
    const { cart, removeFromCart } = useCart();
    const [message, setMessage] = useState(""); // State for message

    const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleRemove = (id) => {
        removeFromCart(id);
        setMessage("Item removed from cart."); // Set message when item is removed
        setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    };

    return (
        <MainLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                {message && <p className="text-green-500">{message}</p>}{" "}
                {/* Display message */}
                {cart.length > 0 ? (
                    <div>
                        <ul>
                            {cart.map((item) => (
                                <li key={item._id} className="border-b p-4">
                                    <h2 className="font-semibold">
                                        {item.name}
                                    </h2>
                                    <p>Price: {formatPrice(item.price)}</p>{" "}
                                    {/* Use formatPrice */}
                                    <p>Quantity: {item.quantity}</p>
                                    <p>
                                        Total:{" "}
                                        {formatPrice(
                                            item.price * item.quantity
                                        )}{" "}
                                        {/* Use formatPrice */}
                                    </p>
                                    <button
                                        onClick={() => handleRemove(item._id)} // Use handleRemove
                                        className="text-red-500 hover:text-red-700 transition duration-200"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <h2 className="text-xl font-bold mt-4">
                            Total: {formatPrice(totalPrice)}{" "}
                            {/* Use formatPrice */}
                        </h2>
                        <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-600 transition duration-200">
                            Proceed to Contact for Payment
                        </button>
                    </div>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        </MainLayout>
    );
};

export default Cart;
