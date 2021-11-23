const router = require("express").Router();

const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const PartyController = require("./controllers/PartyController");
const TokenMiddleware = require("./helpers/TokenMiddleware");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.get("/user/:id", TokenMiddleware, UserController.get);
router.put("/user", TokenMiddleware, UserController.update);

router.get("/party", PartyController.get);
router.post(
  "/party",
  TokenMiddleware,
  PartyController.multer,
  PartyController.create
);

module.exports = router;
