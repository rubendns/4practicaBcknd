import CartDao from "../../dao/carts.dao.js";
import ProductDao from "../../dao/products.dao.js";
import UserDao from "../../dao/users.dao.js";
import TicketDao from "../../dao/ticket.dao.js";

import CartRepository from "./cart.repository.js";
import ProductRepository from "./product.repository.js";
import UserRepository from "./user.repository.js";
import TicketRepository from "./ticket.repository.js";

const cartDao = new CartDao();
const productDao = new ProductDao();
const userDao = new UserDao();
const ticketDao = new TicketDao();

export const cartService = new CartRepository(cartDao);
export const productService = new ProductRepository(productDao);
export const userService = new UserRepository(userDao);
export const ticketService = new TicketRepository(ticketDao);