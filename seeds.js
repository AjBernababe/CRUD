import mongoose from 'mongoose';
import Product from './models/product.js';

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
    console.log("Connection Open")
}

const products = [
    { name: 'Durian', price: 4.99, category: 'fruit' },
    { name: 'Organic Spinach', price: 2.49, category: 'vegetable' },
    { name: 'Almond Milk', price: 3.29, category: 'dairy' },
    { name: 'Strawberries', price: 4.99, category: 'fruit' },
    { name: 'Broccoli', price: 1.79, category: 'vegetable' },
    { name: 'Greek Yogurt', price: 2.99, category: 'dairy' },
    { name: 'Avocado', price: 2.29, category: 'fruit' },
    { name: 'Kale', price: 1.69, category: 'vegetable' },
    { name: 'Cheddar Cheese', price: 5.49, category: 'dairy' },
    { name: 'Blueberries', price: 3.99, category: 'fruit' }
];

Product.insertMany(products)
    .then(p => console.log(p))
    .catch(e => console.log(e))