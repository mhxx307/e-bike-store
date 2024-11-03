// pages/api/product-types/[id].js
import connectDB from "@/lib/mongodb";
import ProductType from "@/models/ProductType";
import mongoose from "mongoose";

export default async function handler(req, res) {
    await connectDB();

    const { method } = req;
    const { id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product type ID" });
    }

    switch (method) {
        case "PUT":
            const { name } = req.body;
            try {
                const updatedProductType = await ProductType.findByIdAndUpdate(
                    id,
                    { name },
                    { new: true }
                );
                if (!updatedProductType) {
                    return res
                        .status(404)
                        .json({ message: "Product type not found" });
                }
                res.status(200).json(updatedProductType);
            } catch (error) {
                res.status(400).json({
                    message: "Error updating product type",
                });
            }
            break;

        case "DELETE":
            try {
                const deletedProductType = await ProductType.findByIdAndDelete(
                    id
                );
                if (!deletedProductType) {
                    return res
                        .status(404)
                        .json({ message: "Product type not found" });
                }
                res.status(200).json({ message: "Product type deleted" });
            } catch (error) {
                res.status(400).json({
                    message: "Error deleting product type",
                });
            }
            break;

        default:
            res.status(405).json({ message: "Method not allowed" });
            break;
    }
}
