import mongoose from "mongoose";
const { Schema } = mongoose;

const farmSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  city: String,
  email: String,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export const Farm = mongoose.model("Farm", farmSchema);
