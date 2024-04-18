import CustomRouter from "./custom/custom.router.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct
} from "../controllers/products.controller.js";
import { verificarPropietarioMiddleware } from "../middlewares/owner.middleware.js";

export default class ProductExtendRouter extends CustomRouter {
  init() {

    // Obtener un producto por ID
    this.get('/:id', ["PUBLIC"], async (req, res) => {
      getProductById(req, res)
    });

    // Get all products
    this.get('/', ["PUBLIC"], async (req, res) => {
      getAllProducts(req, res)
    });

    // Crear un nuevo producto
    this.post('/', ["ADMIN", "PREMIUM"], async (req, res) => {
      createProduct(req, res)
    });


    // Actualizar un producto por ID
    this.put('/:id', ["ADMIN", "PREMIUM"], verificarPropietarioMiddleware, async (req, res) => {
      updateProduct(req, res)
    });

    // Eliminar un producto por ID
    this.delete('/:id', ["ADMIN", "PREMIUM"], verificarPropietarioMiddleware, async (req, res) => {
      deleteProduct(req, res)
    });

  }
}