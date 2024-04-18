export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAllProducts = async () => {
    return await this.dao.getAllProducts();
  }

  getProductById = async (id) => {
    return await this.dao.getProductById(id);
  }

  addProduct = async (product) => {
    return await this.dao.addProduct(product);
  }

  updateProduct = async (productId, updatedData) => {
    return await this.dao.updateProduct(productId, updatedData);
  }

  updateStock = async (productId, qtty) => {
    return await this.dao.updateStock(productId, qtty);
  }

  deleteProduct = async (productId) => {
    return await this.dao.deleteProduct(productId);
  }

}