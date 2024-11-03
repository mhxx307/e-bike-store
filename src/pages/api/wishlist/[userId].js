import connectDB from "@/lib/mongodb";
import Wishlist from "@/models/Wishlist"; // Assume you have a Wishlist model

export default async function handler(req, res) {
    const { method } = req;
    const { userId } = req.query;

    await connectDB();

    switch (method) {
        case "GET":
            try {
                const wishlist = await Wishlist.findOne({ userId }).populate(
                    "products"
                );
                res.status(200).json(wishlist ? wishlist.products : []);
            } catch (error) {
                res.status(500).json({ message: "Error fetching wishlist" });
            }
            break;
        case "POST":
            try {
                const { product } = req.body;
                await Wishlist.findOneAndUpdate(
                    { userId },
                    { $addToSet: { products: product } }, // Add product if it doesn't exist
                    { upsert: true, new: true }
                );
                res.status(200).json({ message: "Product added to wishlist" });
            } catch (error) {
                res.status(500).json({ message: "Error adding to wishlist" });
            }
            break;
        case "DELETE":
            try {
                const { productId } = req.query;
                await Wishlist.findOneAndUpdate(
                    { userId },
                    { $pull: { products: { _id: productId } } }
                );
                res.status(200).json({
                    message: "Product removed from wishlist",
                });
            } catch (error) {
                res.status(500).json({
                    message: "Error removing from wishlist",
                });
            }
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
    }
}
