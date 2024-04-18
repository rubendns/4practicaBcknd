import { Router } from "express";
import ProductDao from "../dao/products.dao.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const { limit, page, sort, category } = req.query;
  const productDao = new ProductDao();
  const products = await productDao.getAllProducts({ limit, page, sort, category });

  res.render("products", {
    fileCss: "styles.css",
    fileJs: "main.scripts.js",
    products: products,
    user: req.session.user || req.user,
    admin: req.session.user && req.session.user.type === "admin"? true : false,
    rolPremium: req.session.user && req.session.user.rol === "premium" ? true : false,
    rolStandar: req.session.user && req.session.user.rol === "standar" ? true : false,
  });
});

export default router;