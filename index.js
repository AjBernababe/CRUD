import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";

//Models
import { Product, categories } from "./models/product.js";

//Dynamic Path
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// #region Mongoose
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
    console.log("Connection Open")
}
//#endregion

const app = express();

//EJS/Route Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'));

// #region Routes

//Homepage
app.get('/', (req, res) => {
    res.send("WELCOME TO IRON NIGGER")
})

//Show all products
app.get('/products', async (req, res) => {
    const products = await Product.find(req.query && req.query)

    res.render('products/index', { products })
})

//Create New Product
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})
app.post('/products', async (req, res) => {
    const { name, price, category } = req.body;
    if (name && price && category) {
        const product = new Product({
            name,
            price,
            category
        })
        await product.save()
        res.redirect(`/products/${product.id}`)
    }
    else
        res.redirect('/products')
})

//Show product
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id)
        res.render('products/show', { product })
    }
    catch {
        res.send('<h1>PRODUCT NOT FOUND</h1>')
    }
})

//Edit product
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id)
        res.render('products/edit', { product, categories })
    }
    catch {
        res.send('<h1>PRODUCT NOT FOUND</h1>')
    }
})
app.put('/products/:id', async (req, res) => {
    const { id } = req.params
    const { name, price, category } = req.body;
    if (name && price && category) {
        await Product.findByIdAndUpdate(id, {
            name,
            price,
            category
        }, { runValidators: true })
        res.redirect(`/products/${id}`)
    }
    else
        res.redirect('/products')
})

//Delete product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    res.redirect('/products')
})
// #endregion

//PORT
app.listen(8080, () => {
    console.log(`APP IS LISTENING ON PORT 8080`)
})