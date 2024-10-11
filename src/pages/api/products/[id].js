// pages/api/products/[id].js
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { authenticate } from "@/pages/api/middleware/auth";

export default authenticate(async function handler(req, res) {
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
        default:
            res.status(405).json({ message: "Method not allowed" });
    }
});
