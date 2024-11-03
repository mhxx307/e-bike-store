// models/Product.js
import mongoose from "mongoose";
import ProductType from "./ProductType"; // Make sure this path is correct

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    images: [{ type: String }], // Store multiple image URLs
    specifications: [
        {
            name: { type: String, required: true },
            value: { type: String, required: true },
        },
    ],
    productType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductType",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});

// Ensure proper export
const Product =
    mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
