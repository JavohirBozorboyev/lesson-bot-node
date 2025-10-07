import Product from "../models/Product.js";

// Create new product
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, quantity, category } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Get all products with category info
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Get single product by id
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    );
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Update product
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Delete product
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    await product.remove();
    res.json({ message: "Product removed" });
  } catch (error) {
    next(error);
  }
};
