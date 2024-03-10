import mongoose from "mongoose";
import Upload from "../models/Upload.js";
import User from "../models/User.js"

export const createUpload = async (req, res) => {
    try {
        let {
            userId,
            productName,
            productPrice,
            productRating,
            productReview,
            purchaseDate,
            picturePath,
        } = req.body;

        

        // Handle case where userId might be an array
        if (Array.isArray(userId)) {
            // Find the first non-empty value in the array
            userId = userId.find(id => id);
            if (!userId) {
                return res.status(400).json({ error: "userId is required" });
            }
        }
        

        const newUpload = new Upload({
            userId,
         
            productName,
            productPrice,
            productRating,
            productReview,
            purchaseDate,
            picturePath,
        });

        const savedUpload = await newUpload.save();
        res.status(201).json(savedUpload);
    } catch (err) {
        console.error("Error in createUpload:", err.stack); // Provides a stack trace
        res.status(500).json({ error: err.message });
    }
};

export const getUserUploads = async (req, res) => {
  try{
    const {userId} =req.params;
    const upload = await Upload.find({userId});
    res.status(200).json(upload);
  } catch(err) {
    res.status(404).json({ message: err.message});
  }
}