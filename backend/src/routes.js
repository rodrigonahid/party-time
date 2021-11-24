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
router.get("/party/user", TokenMiddleware, PartyController.getUser);
router.get("/party/user/:id", TokenMiddleware, PartyController.getOnlyUser);
router.get("/party/:id", PartyController.getPrivacy);
router.post(
  "/party",
  TokenMiddleware,
  PartyController.multer,
  PartyController.create
);
router.put(
  "/party",
  TokenMiddleware,
  PartyController.multer,
  PartyController.update
);
router.delete("/party", TokenMiddleware, PartyController.delete);

module.exports = router;
