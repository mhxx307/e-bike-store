import Header from "@/components/particles/header";
import Footer from "@/components/particles/footer";

export default function MainLayout({ children }) {
    return (
        <div>
            <Header />
            <main className="bg-gray-50 min-h-screen">{children}</main>
            <Footer />
        </div>
    );
}
