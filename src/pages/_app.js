import { CartProvider } from "@/contexts/CartContext";
import { UserProvider } from "@/contexts/UserContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <CartProvider>
                <WishlistProvider><Component {...pageProps} /></WishlistProvider>
            </CartProvider>
        </UserProvider>
    );
}
