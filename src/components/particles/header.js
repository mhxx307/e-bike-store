// components/Header.js
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);

    const handleLogout = () => {
        logout();
        router.push("/"); // Redirect to home page after logout
    };

    return (
        <header className="bg-white shadow-lg">
            <div className="container mx-auto flex items-center justify-between py-4 px-4">
                {/* Logo */}
                <div className="text-xl font-bold">
                    <a href="#">E-Bike Store</a>
                </div>

                {/* Search Bar */}
                <div className="flex-1 mx-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Right Side - Sign In/Up and Cart */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-sm font-medium">
                                {user.email}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <a href="/register" className="text-sm font-medium">
                            Sign In / Sign Up
                        </a>
                    )}
                    <Link href={"/cart"} className="relative">
                        <FaShoppingCart className="text-xl" />
                        <span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full px-1">
                            {totalItems}
                        </span>
                    </Link>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="bg-gray-200">
                <div className="container mx-auto flex space-x-4 py-2 px-4">
                    <a href="#" className="hover:text-blue-500">
                        Home
                    </a>
                    <a href="#" className="hover:text-blue-500">
                        Products
                    </a>
                    <a href="#" className="hover:text-blue-500">
                        About Us
                    </a>
                    <a href="#" className="hover:text-blue-500">
                        Contact
                    </a>
                </div>
            </nav>
        </header>
    );
}
