export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAllCarts = async () => {
    return await this.dao.getAllCarts();
  }

  getCartById = async (id) => {
    return await this.dao.getCartById(id);
  }  

  getCartByUserId = async (userId) => {
    return await this.dao.getCartByUserId(userId);
  }

  createCart = async () => {
    return await this.dao.createCart();
  }

  addProductToCart = async (anId, productId, qtty) => {
    return await this.dao.addProductToCart(anId, productId, qtty);
  }

  updateCart = async (id, cart) => {
    return await this.dao.updateCart(id, cart);
  }

  deleteProductFromCart = async (cartId, productId) => {
    return await this.dao.deleteProductFromCart(cartId, productId);
  }

  deleteCart = async (id) => {
    return await this.dao.deleteCart(id);
  }

}