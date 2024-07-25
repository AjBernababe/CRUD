import express from "express";
import mongoose from "mongoose";

//Models
import Product from "./models/product.js";

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

// #region Routes

//Homepage
app.get('/', (req, res) => {
    res.send("WELCOME TO IRON NIGGER")
})

// #endregion

//PORT
app.listen(8080, () => {
    console.log(`APP IS LISTENING ON PORT 8080`)
})