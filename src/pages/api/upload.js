// pages/api/upload.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { images } = req.body; // Expecting an array of images
            const uploadPromises = images.map((image) =>
                cloudinary.uploader.upload(image, {
                    folder: "e-bike-store",
                })
            );

            const results = await Promise.all(uploadPromises);
            const urls = results.map((result) => result.secure_url);

            res.status(200).json({ urls });
        } catch (error) {
            res.status(500).json({ error: "Image upload failed" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
