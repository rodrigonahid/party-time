const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/user");

const AuthController = {
  register: async (req, res) => {
    const { name, email, password, confirmPassword } = await req.body;
    if (
      name == null ||
      email == null ||
      password == null ||
      confirmPassword == null
    ) {
      return res.status(400).json({ error: "Fill the form" });
    }
    if (password != confirmPassword) {
      return res.status(400).json({ error: "Passwords doesn't match" });
    }
    const emailExists = await UserSchema.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }
    // Create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new UserSchema({
      name,
      email,
      password: passwordHash,
    });
    try {
      const newUser = await user.save();

      const token = jwt.sign(
        {
          name: newUser.name,
          id: newUser.id,
        },
        "912ec803b2ce49e4a541068d495ab570"
      );
      res.json({
        error: null,
        msg: "Voce realizou o cadastro com sucesso",
        token: token,
        userId: newUser.id,
      });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await UserSchema.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ err: "Email not registered" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ err: "Invalid password" });
    }
    const token = jwt.sign(
      {
        name: user.name,
        id: user.id,
      },
      "912ec803b2ce49e4a541068d495ab570"
    );
    res.json({
      error: null,
      msg: "Voce esta autenticado",
      token: token,
      userId: user.id,
    });
  },
};

module.exports = AuthController;
