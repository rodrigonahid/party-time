const User = require("../models/user");
const getUserByToken = require("../helpers/getUserByToken");

const UserController = {
  get: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({ _id: id }, { password: 0 });
      res.json({ error: null, user });
    } catch (err) {
      res.status(400).json({ err: "User does not exists" });
    }
  },
  update: async (req, res) => {
    const token = req.header("auth-token");
    const user = await getUserByToken(token);
    const { userReqId } = req.body;

    if (user._id.toString() !== userReqId) {
      return res
        .status(401)
        .json({ error: "Access denied. User doesnt match" });
    }

    const updateData = {
      name: req.body.name,
      email: req.body.email,
    };
    if (password !== confirmPassword) {
      res.status(400).json({ error: "Passwords doesnt match" });
    } else if (passoword == confirmPassword && password != null) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
      updateData.password = passwordHash;
    }

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id.toString() },
        { $set: { updateData } }
      );
      res.json({ error: null, msg: "User updated", data: updatedUser });
    } catch (err) {
      res.send(400).json({ err });
    }
  },
};

module.exports = UserController;
