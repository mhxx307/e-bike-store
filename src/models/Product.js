// models/Product.js
import mongoose from "mongoose";

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

module.exports =
    mongoose.models.Product || mongoose.model("Product", ProductSchema);
