import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import { AppError } from "./AppError.js";
import { wrapAsync } from "./utils/wrapAsync.js";

//Models
import { Product, categories } from "./models/product.js";
import { Farm } from "./models/farm.js";

//Dynamic Path
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// #region Mongoose
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/farmStand");
  console.log("Connection Open");
}
//#endregion

const app = express();

//EJS/Route Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// #region Routes

//Homepage
app.get("/", (req, res) => {
  res.send("WELCOME TO ╒ÄüÄ)¥◄");
});

//Show all products
app.get(
  "/products",
  wrapAsync(async (req, res, next) => {
    const products = await Product.find(req.query && req.query);

    res.render("products/index", { products });
  })
);

//Create New Product
app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});
//
app.post(
  "/products",
  wrapAsync(async (req, res, next) => {
    const { name, price, category } = req.body;

    const product = new Product({
      name,
      price,
      category,
    });
    await product.save();
    res.redirect(`/products/${product.id}`);
  })
);

//Show product
app.get(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      throw new AppError("PRODUCT NOT FOUND", 402);
    }
    res.render("products/show", { product });
  })
);

//Edit product
app.get(
  "/products/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      throw new AppError("PRODUCT NOT FOUND", 402);
    }
    res.render("products/edit", { product, categories });
  })
);
//
app.put(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, category } = req.body;

    await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        category,
      },
      { runValidators: true }
    );
    res.redirect(`/products/${id}`);
  })
);

//Delete product
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

//Show all farms
app.get(
  "/farms",
  wrapAsync(async (req, res, next) => {
    const farms = await Farm.find({});

    res.render("farms/index", { farms });
  })
);

//Create New Farm
app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});
//
app.post(
  "/farms",
  wrapAsync(async (req, res, next) => {
    const farm = new Farm(req.body);
    await farm.save();

    res.redirect(`/farms`);
  })
);

//Show farm
app.get(
  "/farms/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render("farms/show", { farm });
  })
);
// #endregion

app.use((err, req, res, next) => {
  const { message = "Something went wrong", status = 500 } = err;
  res.status(status).send(message);
});

//PORT
app.listen(8080, () => {
  console.log(`APP IS LISTENING ON PORT 8080`);
});
