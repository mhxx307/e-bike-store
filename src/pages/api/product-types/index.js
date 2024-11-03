// pages/api/product-types/index.js
import connectDB from "@/lib/mongodb";
import ProductType from "@/models/ProductType";

export default async function handler(req, res) {
    await connectDB();

    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const productTypes = await ProductType.find({});
                res.status(200).json(productTypes);
            } catch (error) {
                res.status(500).json({
                    message: "Error retrieving product types",
                });
            }
            break;

        case "POST":
            const { name } = req.body;
            try {
                const newProductType = new ProductType({ name });
                await newProductType.save();
                res.status(201).json(newProductType);
            } catch (error) {
                res.status(400).json({
                    message: "Error creating product type",
                });
            }
            break;

        default:
            res.status(405).json({ message: "Method not allowed" });
            break;
    }
}
