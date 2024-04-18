import CustomRouter from "./custom/custom.router.js";
import {
  getAllCarts,
  getCartById,
  getCartByUserId,
  createCart,
  deleteWholeCart,
  deleteProductFromCartById,
  addProductToCartById,
  purchaseCart,
} from "../controllers/carts.controller.js";
import { verificarPropietarioCarritoMiddleware } from "../middlewares/owner.middleware.js";

export default class CartExtendRouter extends CustomRouter {
  init() {

    // purchase cart
    this.post('/:cid/purchase', ["USER", "ADMIN"], async (req, res) => {
      purchaseCart(req, res)
        .then((result) => {
          res.status(200).json(result);
        })
    });

    // Get all carts
    this.get('/', ["ADMIN"], async (req, res) => {
      getAllCarts(req, res)
    });

    // Get a cart by ID
    this.get('/:id', ["USER", "ADMIN"], async (req, res) => {
      getCartById(req, res)
    });

    // Get a cart by user ID
    this.get('/user/:uid', ["USER", "ADMIN"], async (req, res) => {
      getCartByUserId(req, res)
    });

    // Agregar un producto al carrito por ID
    this.put('/:cid/product/:pid/:qtty', ["USER", "ADMIN"],  async (req, res) => {
      addProductToCartById(req, res)
    });

    // Eiminar un producto del carrito por ID
    this.delete('/:cid/product/:pid', ["USER", "ADMIN"], async (req, res) => {
      deleteProductFromCartById(req, res)
    });

    // Eiminar todo el carrito
    this.delete('/:cid/', ["USER", "ADMIN"], async (req, res) => {
      deleteWholeCart(req, res)
    });

    // Crear un nuevo carrito
    this.post('/:uid', ["USER", "ADMIN"], async (req, res) => {
      createCart(req, res)
    });
  }
}