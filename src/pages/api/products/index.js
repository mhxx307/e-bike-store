// pages/api/products/index.js
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function handler(req, res) {
    const { method } = req;

    await connectDB();

    if (method === "GET") {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: "Error fetching products" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
