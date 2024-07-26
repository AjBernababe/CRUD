import mongoose from "mongoose";

export const categories = ['fruit', 'vegetable', 'dairy']

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: categories
    }
})

export const Product = mongoose.model('Product', productSchema);