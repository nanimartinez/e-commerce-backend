// productService.js
import Product from "../models/Product.js";

export const getProducts = async (query, options) => {
    return await Product.paginate(query, options);
};

export const getProductById = async (id) => {
    return await Product.findById(id);
};

export const createProduct = async (productData) => {
    const newProduct = new Product(productData);
    return await newProduct.save();
};

export const updateProduct = async (id, productData) => {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
};

export const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};