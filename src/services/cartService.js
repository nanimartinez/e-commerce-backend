// cartService.js
import Cart from "../models/Cart.js";

export const getCart = async (cartId) => {
    return await Cart.findById(cartId).populate("products.product");
};

export const addProductToCart = async (cartId, productId, quantity) => {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
    );

    if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
    } else {
        cart.products.push({ product: productId, quantity });
    }

    return await cart.save();
};

export const removeProductFromCart = async (cartId, productId) => {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    cart.products = cart.products.filter(
        (item) => item.product.toString() !== productId
    );

    return await cart.save();
};

export const updateCart = async (cartId, products) => {
    return await Cart.findByIdAndUpdate(
        cartId,
        { products },
        { new: true }
    ).populate("products.product");
};

export const updateProductQuantity = async (cartId, productId, quantity) => {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
    );

    if (productIndex === -1) throw new Error("Producto no encontrado en el carrito");

    cart.products[productIndex].quantity = quantity;
    return await cart.save();
};

export const clearCart = async (cartId) => {
    return await Cart.findByIdAndUpdate(
        cartId,
        { products: [] },
        { new: true }
    );
};