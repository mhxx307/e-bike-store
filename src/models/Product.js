// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports =
    mongoose.models.Product || mongoose.model("Product", ProductSchema);
