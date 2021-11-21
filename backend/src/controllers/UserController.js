const User = require("../models/user");

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
  update: (req, res) => {},
};

module.exports = UserController;
