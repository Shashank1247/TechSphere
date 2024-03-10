import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },


    productName:String,
    productPrice:String,
    productRating:String,
    productReview:String,
    purchaseDate:String,
    picturePath:String,
    
  },
  { timestamps: true }
);

const Upload = mongoose.model("Upload", UploadSchema);
export default Upload;
