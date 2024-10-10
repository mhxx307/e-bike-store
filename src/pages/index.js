import Image from "next/image";
import localFont from "next/font/local";
import Header from "@/components/particles/header";
import ProductList from "@/components/ProductList";
import Footer from "@/components/particles/footer";

export default function Home() {
    return (
        <div>
            {/* Header */}
            <Header />

            {/* Body */}
            <main className="bg-gray-50 min-h-screen">
                <ProductList />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
