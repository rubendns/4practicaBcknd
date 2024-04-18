import mongoose from "mongoose";
import ProductDao from '../../src/services/dao/products.dao.js' 
import { productModel } from '../../src/models/products.model.js';
import Assert from 'assert'

const assert = Assert.strict

describe('ProductDao', function () {
  let productDao;

  before(async function () {
    this.timeout(5000);
    await mongoose.connect(`mongodb+srv://rubendns:UZLxn4iAGvcRngUY@cluster0.6lu3kn4.mongodb.net/test?retryWrites=true&w=majority`);

    productDao = new ProductDao();
  });

  after(async function () {
    await mongoose.connection.close();
  });

  describe('#addProduct()', function () {
    it('producto agregado', async function () {
      const productData = {
        title: 'Product Title',
        description: 'Product Description',
        price: 10.99,
        code: 'ABC123',
        status: true,
      };
      await productDao.addProduct(productData);
      const product = await productModel.findOne({ code: 'ABC123' });
      assert.strictEqual(product.title, 'Product Title');
      assert.strictEqual(product.description, 'Product Description');
      assert.strictEqual(product.price, 10.99);
      assert.strictEqual(product.code, 'ABC123');
      assert.strictEqual(product.status, true);
    });
  });

  describe('#getAllProducts()', function () {
    it('todos los productos desde la BD', async function () {
      this.timeout(5000);
      const allProducts = await productDao.getAllLegacy();
      assert.strictEqual(Array.isArray(allProducts), true);
    });
  });

  describe('#deleteProduct()', function () {
    it('producto eliminado en la BD', async function () {
      const product = await productModel.findOne({ code: 'ABC123' });
      const result = await productDao.deleteProduct(product._id);
      assert.strictEqual(result._id.toString(), product._id.toString());
      const deletedProduct = await productModel.findById(product._id);
      assert.strictEqual(deletedProduct, null);
    });
  });

});