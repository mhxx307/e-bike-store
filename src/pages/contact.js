// pages/contact.js
import { useCart } from "@/contexts/CartContext";

const Contact = () => {
    const { cart, clearCart } = useCart();

    const handleContactSubmit = () => {
        alert("We have received your order. Our team will contact you soon!");
        clearCart();
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Contact for Payment</h1>
            <p>
                To finalize your purchase, please contact us using the
                information below.
            </p>

            <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <h2 className="text-lg font-bold">Contact Information</h2>
                <p>Email: sales@ebikeshop.com</p>
                <p>Phone: +123-456-7890</p>
            </div>

            <button
                onClick={handleContactSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4"
            >
                Confirm Order and Contact Us
            </button>
        </div>
    );
};

export default Contact;
