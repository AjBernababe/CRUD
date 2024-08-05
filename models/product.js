import mongoose from "mongoose";
const { Schema } = mongoose;

export const categories = ["fruit", "vegetable", "dairy"];

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    lowercase: true,
    enum: categories,
  },
  farm: {
    type: Schema.Types.ObjectId,
    ref: "Farm",
  },
});

export const Product = mongoose.model("Product", productSchema);
