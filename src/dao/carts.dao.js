import { cartModel } from "../models/carts.model.js";
import { productModel } from "../models/products.model.js";
export default class CartDao {
  async getAllCarts() {
    return await cartModel.find();
  }

  async getCartById(cid) {
    return await cartModel.findById(cid);
  }

  async createCart() {
    return await cartModel.create({});
  }

  async addProductToCart(anId, productId, quantity) {
    const cart = await cartModel.findOne({ $or: [{ _id: anId }, { userId: anId }] });
    if (!cart) {
      throw new Error("Cart not found");
    }
    const product = await pDao.getProductById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    const { price } = product;
    const total = price * quantity;
    const existingProductIndex = cart.products.findIndex(item => item.productId.equals(productId));
    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += Number(quantity);
    } else {
      cart.products.push({ productId, quantity });
    }
    cart.total += Number(total);
    cart.totalProducts += Number(quantity);
    cart.updatedAt = new Date();

    return cart.save();
  }

  async deleteProductFromCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("Cart not found");
    }
    const index = cart.products.findIndex(
      (product) => product.productId === pid
    );
    if (index === -1) {
      throw new Error("Product not found in cart");
    }
    cart.products.splice(index, 1);
    await cart.save();
    return cart;
  }

  async updateCart(cid, products) {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("Cart not found");
    }
    cart.products = products;
    await cart.save();
    return cart;
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("Cart not found");
    }
    const product = cart.products.find((product) => product.productId === pid);
    if (!product) {
      throw new Error("Product not found in cart");
    }
    product.quantity = quantity;
    await cart.save();
    return cart;
  }

  async deleteCart(cid) {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("Cart not found");
    }
    await cart.remove();
  }
}

export { CartDao };
