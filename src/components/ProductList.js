// components/ProductList.js
export default function ProductList() {
    return (
        <div className="container mx-auto py-8 px-4">
            <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Product Card Example */}
                <div className="border p-4 rounded-lg shadow-lg">
                    <img
                        src="/bike_p8.jpg"
                        alt="E-Bike"
                        className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-medium">E-Bike Model 1</h3>
                    <p className="text-gray-600">$999.00</p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                        Add to Cart
                    </button>
                </div>

                {/* Repeat for more products */}
            </div>
        </div>
    );
}
