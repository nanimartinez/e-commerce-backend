import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

export const renderProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort, category } = req.query;
        const query = category ? { category } : {};
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
            lean: true,
        };

        const products = await Product.paginate(query, options);
        res.render("products", {
            title: "Productos",
            ...products,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const renderProductDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.pid);
        res.render("productDetail", {
            title: product.name,
            ...product.toObject(),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const renderCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate("products.product");
        res.render("cart", {
            title: "Carrito",
            products: cart.products,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};