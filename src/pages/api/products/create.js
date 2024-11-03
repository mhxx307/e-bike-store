// pages/api/products/create.js
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { authenticate } from "@/pages/api/middleware/auth";

export default authenticate(async function handler(req, res) {
    const { method } = req;

    await connectDB();

    if (method === "POST") {
        const {
            name,
            price,
            description,
            images,
            specifications,
            productType,
        } = req.body;

        try {
            const product = new Product({
                name,
                price,
                description,
                images,
                specifications, // Include specifications
                productType, // Include product type
            });
            await product.save();
            res.status(201).json({ product });
        } catch (error) {
            res.status(400).json({ message: "Error creating product" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
});
