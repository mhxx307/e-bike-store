// pages/api/products/[id].js
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { authenticate } from "@/pages/api/middleware/auth";

const handler = async (req, res) => {
    const {
        method,
        query: { id },
    } = req;

    await connectDB();

    switch (method) {
        case "PUT": {
            try {
                const updatedProduct = await Product.findByIdAndUpdate(
                    id,
                    req.body,
                    {
                        new: true,
                    }
                );
                res.status(200).json(updatedProduct);
            } catch (error) {
                res.status(400).json({ message: "Error updating product" });
            }
            break;
        }
        case "DELETE": {
            try {
                await Product.findByIdAndDelete(id);
                res.status(200).json({ message: "Product deleted" });
            } catch (error) {
                res.status(400).json({ message: "Error deleting product" });
            }
            break;
        }
        case "GET":
            try {
                console.log("id", id);
                const product = await Product.findById(id).populate(
                    "productType"
                );
                console.log("product", product);
                if (!product) {
                    return res
                        .status(404)
                        .json({ success: false, message: "Product not found" });
                }
                res.status(200).json(product);
            } catch (error) {
                console.error("Error fetching product:", error);
                res.status(500).json({
                    success: false,
                    error: error.message || "Internal Server Error",
                });
            }
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
    }
};

export default async function middlewareHandler(req, res) {
    if (req.method === "GET") {
        return handler(req, res); // Call the handler directly without authentication
    }
    return authenticate(handler)(req, res); // Apply authentication for other methods
}
