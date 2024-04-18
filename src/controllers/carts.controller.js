import cartsService from "../dao/carts.dao.js";
import { CartDao } from "../dao/carts.dao.js";
import { updateStock } from "./products.controller.js";
import { createTicket } from "../controllers/tickets.controller.js";
import { sendEmail } from "./email.controller.js";

async function getAllCarts(req, res) {
    try {
        let carts = await cartsService.getAllCarts();
        res.json({
        status: "success",
        carts,
        });
    } catch (error) {
        res.json({
        status: "Error",
        error,
        });
    }
}

async function getCartById(req, res) {
    try {
        let cid = req.params.cid;
        let cart = await cartsService.getCartById(cid);
        res.json({
        status: "success",
        cart,
        });
    } catch (error) {
        res.send(error.message);
    }
}

async function getCartByUserId(req, res) {
    const userId = req.params.uid;
    try {
        const cart = await CartDao.getCartByUserId(userId);
        if (!cart) {
        await CartDao.createCart(userId);
        }
        res.render("cart", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        fileJs: "main.scripts.js",
        title: " Shop Cart",
        user: req.session.user,
        cart: cart,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createCart(req, res) {
    try {
        let cart = await cartsService.createCart();
        res.json({
        status: "success",
        cart,
        });
    } catch (error) {
        res.json({
        status: "Error",
        error,
        });
    }
}

async function addProductToCartById(req, res) {
    const anID = req.params.cid;
    const productID = req.params.pid;
    const qtty = req.params.qtty;
    try {
        const updatedCart = await cartDao.addProductToCart(anID, productID, qtty);
        if (!updatedCart) {
        return res.status(404).json({ error: "carrito no actualizado" });
        }
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteWholeCart(req, res) {
    const cartID = req.params.cid;
    try {
        const updatedCart = await cartDao.deleteCart(cartID);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteProductFromCartById(req, res) {
    const cartID = req.params ? req.params.cid : req.cid;
    const productID = req.params ? req.params.pid : req.pid._id;
    try {
        const updatedCart = await cartDao.deleteProductFromCart(cartID, productID);
        if (!updatedCart) {
        // return res.status(404).json({ error: 'carrito no actualizado' });
        }
        res.status(200).json(updatedCart);
    } catch (error) {
        // res.status(500).json({ error: error.message });
    }
}

async function deleteProductFromCart(req, res) {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let response = await cartsService.deleteProductFromCart(cid, pid);
        res.json({
        status: "success",
        response,
        });
    } catch (error) {
        res.send(error.message);
    }
}

async function updateCart(req, res) {
    try {
        let cid = req.params.cid;
        let products = req.body;
        let response = await cartsService.updateCart(cid, products);
        res.json({
        status: "success",
        response,
        });
    } catch (error) {
        res.send(error.message);
    }
}

async function updateProductQuantity(req, res) {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let quantity = req.body.quantity;
        let response = await cartsService.updateProductQuantity(cid, pid, quantity);
        res.json({
        status: "success",
        response,
        });
    } catch (error) {
        res.send(error.message);
    }
}

async function deleteCart(req, res) {
    try {
        let cid = req.params.cid;
        await cartsService.deleteCart(cid);
        res.json({
        status: "success",
        message: "Cart deleted",
        });
    } catch (error) {
        res.send(error.message);
    }
}

async function purchaseCart(req, res) {
    try {
        const cartId = req.params.cid;
        const productsFromCart = await CartDao.getProductsFromCartById(cartId);
        const { validProducts, invalidProducts } = evaluateStock(productsFromCart);
        let grandTotal = 0;
        for (const product of validProducts) {
        grandTotal += product.productId.price * product.quantity;
        await CartDao.updateStock(product.productId, product.quantity);
        const reqs = { cid: cartId, pid: product.productId };
        await CartDao.deleteProductFromCartById(reqs, res);
        }
        if (validProducts.length > 0) {
        console.log("total: ", grandTotal);
        const ticket = {
            amount: grandTotal,
            purchaser: req.session.user.username,
        };
        const createdTicket = await createTicket(ticket, res);
        console.log(createTicket);
        sendEmail(
            req.session.user.email,
            " compra realizada ",
            mensajeCompra(req.session.user.username, grandTotal, "code")
        );
        } else {
        // res.status(400).json({ message: "No hay productos válidos en el carrito" });
        }
    } catch (error) {
        console.error("Error en purchaseCartController:", error);
        // res.status(500).json({ message: "Error en el servidor" });
    }
}

function evaluateStock(productsFromCart) {
    const validProducts = [];
    const invalidProducts = [];
    productsFromCart.forEach((product) => {
        if (product.quantity <= product.productId.stock) {
        validProducts.push(product);
        } else {
        invalidProducts.push(product);
        }
    });
    return { validProducts, invalidProducts };
}

export {
    purchaseCart,
    getAllCarts,
    getCartById,
    getCartByUserId,
    createCart,
    addProductToCartById,
    deleteProductFromCart,
    deleteWholeCart,
    deleteProductFromCartById,
    updateCart,
    updateProductQuantity,
    deleteCart,
};
