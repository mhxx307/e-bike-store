import { formatPrice } from "@/utils/helper";
import Link from "next/link";
import React from "react";

function ProductCard({ product }) {
    return (
        <div className="border p-4 rounded-lg shadow-lg">
            <img
                src="/bike_p8.jpg"
                alt="E-Bike"
                className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-medium">{product.name}</h3>
            {/* <p className="text-gray-600">{product.description}</p> */}
            <p className="text-gray-600 mb-4">{formatPrice(product.price)}</p>

            <div className="mb-4 space-x-2">
                {/* <input
                    type="number"
                    min="1"
                    defaultValue={1}
                    id={`quantity-${product._id}`}
                    className="w-16 text-center border rounded mr-4"
                /> */}

                {/* <button
                    onClick={() => {
                        const quantity = document.getElementById(
                            `quantity-${product._id}`
                        ).value;
                        addToCart(product, parseInt(quantity));
                    }}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Thêm vào giỏ hàng
                </button> */}

                <Link
                    href={"/contact-payment"}
                    className=" bg-green-500 text-white px-4 py-2 rounded"
                >
                    Liên hệ
                </Link>

                <Link
                    href={"/contact-payment"}
                    className=" bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Mua hàng
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;
