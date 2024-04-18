import CustomRouter from "./custom/custom.router.js";
import CartDao from "../dao/carts.dao.js"
import { createHash, isValidPassword, generateJWToken } from "../utils.js";
import passport from 'passport';
export default class UserExtendRouter extends CustomRouter {
  init() {
    const cartDao = new CartDao();

    this.get('/profile', ["USER", "ADMIN"], passport.authenticate('jwt', {session: false}), async (req, res) => {
      res.render('profile', {
        user: req.user // Trtabajando con JWT
      })
    });

    this.get("/github", ["PUBLIC"], passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
      { }
    })

    this.get("/githubcallback", ["PUBLIC"], passport.authenticate('github', { failureRedirect: '/fail-login' }), async (req, res) => {
      const user = req.user;
      await cartDao.createCart(req.user._id);
      req.session.user = { ...user.toObject() }

      const access_token = generateJWToken(user)
      res.cookie('jwtCookieToken', access_token, { httpOnly: true });
      res.redirect("/users");
    })

    // Register with passport
    this.post('/register', ["PUBLIC"], passport.authenticate('register', {
      failureRedirect: '/api/users/fail-register'
    }), async (req, res) => {
      await cartDao.createCart(req.user._id);
      res.status(201).send({ status: "success", message: "User crated successfully" });
    })

    // Login with passport
    this.post('/login', ["PUBLIC"], passport.authenticate('login',
      {
        failureRedirect: '/api/session/fail-login'
      }
    ), async (req, res) => {
      const user = req.user;
      req.session.user = { ...user.toObject() }
      if (!user) return res.status(401).send({ status: "error", error: "Wrong user/password credentials" });
      // Usando JWT 
      const access_token = generateJWToken(user)
      // console.log(access_token);
      res.cookie('jwtCookieToken', access_token, { httpOnly: true });
      res.send({ access_token: access_token });
      // res.send({ status: "success", payload: user, access_token, message: "Login successful" });
      // res.send({ status: "success", payload: req.session.user, message: "Login successful" });
    })

    this.post('/logout', ["PUBLIC"], (req, res) => {
      res.clearCookie('jwtCookieToken');
      req.session.destroy(error => {
        if (error) {
          res.json({ error: 'Error logout', msg: "Error logging out" })
        }
        res.send('Session cerrada correctamente!')
      })
    });

    this.get("/fail-register", ["PUBLIC"], (req, res) => {
      res.status(401).send({ error: "Failed to register!" });
    });

    this.get("/fail-login", ["PUBLIC"], (req, res) => {
      res.status(401).send({ error: "Something went wrong, try again shortly!" });
    });
  }
}
