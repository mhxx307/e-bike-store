import { CartProvider } from "@/contexts/CartContext";
import { UserProvider } from "@/contexts/UserContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <CartProvider>
                <Component {...pageProps} />
            </CartProvider>
        </UserProvider>
    );
}
