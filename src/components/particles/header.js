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
        router.push("/"); // Chuyển hướng về trang chủ sau khi đăng xuất
    };

    return (
        <header className="bg-white shadow-lg">
            <div className="container mx-auto flex items-center justify-between py-4 px-4">
                {/* Logo */}
                <div className="text-xl font-bold">
                    <a href="#">Cửa Hàng E-Bike</a>
                </div>

                {/* Thanh Tìm Kiếm */}
                <div className="flex-1 mx-4">
                    <input
                        type="text"
                        placeholder="Tìm sản phẩm..."
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                {/* Phía Bên Phải - Đăng Nhập/Đăng Ký và Giỏ Hàng */}
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
                                Đăng Xuất
                            </button>
                        </>
                    ) : (
                        <a href="/register" className="text-sm font-medium">
                            Đăng Nhập / Đăng Ký
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

            {/* Menu Điều Hướng */}
            <nav className="bg-gray-200">
                <div className="container mx-auto flex space-x-4 py-2 px-4">
                    <a href="#" className="hover:text-blue-500">
                        Trang Chủ
                    </a>
                    <a href="#" className="hover:text-blue-500">
                        Sản Phẩm
                    </a>
                    <a href="#" className="hover:text-blue-500">
                        Về Chúng Tôi
                    </a>
                    <a href="#" className="hover:text-blue-500">
                        Liên Hệ
                    </a>
                </div>
            </nav>
        </header>
    );
}
