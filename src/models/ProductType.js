// models/ProductType.js
import mongoose from "mongoose";

const ProductTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports =
    mongoose.models.ProductType ||
    mongoose.model("ProductType", ProductTypeSchema);
