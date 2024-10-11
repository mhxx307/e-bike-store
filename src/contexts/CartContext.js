// context/CartContext.js
import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(
                (item) => item._id === product._id
            );
            if (existingProduct) {
                // If the product already exists in the cart, increase the quantity
                return prevCart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Add new product to the cart
                return [...prevCart, { ...product, quantity }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
