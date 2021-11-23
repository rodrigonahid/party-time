const jwt = require("jsonwebtoken");
const multer = require("multer");
const getUserByToken = require("../helpers/getUserByToken");

const Party = require("../models/party");
const User = require("../models/user");
const diskStorage = require("../helpers/fileStorage");
const upload = multer({ storage: diskStorage });

const PartyController = {
  create: async (req, res) => {
    const { title, description, partyDate } = req.body;

    let files = [];

    if (req.files) {
      files = req.files.photos;
    }

    if (title == null || description == null || partyDate == null) {
      return res.status(400).json({ error: "Fill the fields" });
    }

    const token = req.header("auth-token");
    const userByToken = await getUserByToken(token);
    const userId = userByToken._id.toString();

    try {
      const user = await User.findOne({ _id: userId });
      let photos = [];
      if (files && files.length > 0) {
        files.forEach((photo, index) => {
          photos[i] = photo.path;
        });
      }
      const party = new Party({
        title: title,
        description: description,
        partyDate: partyDate,
        photos: photos,
        privacy: req.body.privacy,
        userId: userId,
      });

      try {
        const newParty = await party.save();
        res.json({
          error: null,
          msg: "Evento criado com sucesso",
          data: newParty,
        });
      } catch (err) {
        return res.status(400).json({ err });
      }
    } catch (err) {
      return res.status(400).json({ error: "Access denied" });
    }
  },
  get: async (req, res) => {
    try {
      const parties = await Party.find({ privacy: false }).sort([["_id", -1]]);
      res.json({ err: null, parties });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  multer: upload.fields({ name: "photos" }),
};

module.exports = PartyController;
