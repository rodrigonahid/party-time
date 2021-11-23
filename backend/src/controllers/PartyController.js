const jwt = require("jsonwebtoken");
const multer = require("multer");
const getUserByToken = require("../helpers/getUserByToken");

const Party = require("../models/party");
const User = require("../models/user");
const diskStorage = require("../helpers/fileStorage");

const PartyController = {
  get: (req, res) => {
    res.status(400).json({ err: "error" });
  },
};

module.exports = PartyController;
