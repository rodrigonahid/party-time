const router = require("express").Router();

const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const TokenMiddleware = require("./helpers/TokenMiddleware");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.get("/user/:id", TokenMiddleware, UserController.get);
router.put("/", TokenMiddleware, UserController.update);

module.exports = router;
