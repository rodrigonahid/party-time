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
  getUser: async (req, res) => {
    try {
      const token = req.header("auth-token");
      const user = await getUserByToken(token);
      const userId = user._id.toString();
      const parties = await Party.find({ userId: userId });
      res.json({ error: null, parties: parties });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  getOnlyUser: async (req, res) => {
    try {
      const token = req.header("auth-token");
      const user = await getUserByToken(token);
      const userId = user._id.toString();
      const partyId = req.params.id;
      const party = await Party.findOne({ _id: partyId, userId: userId });
      res.json({ err: null, party: party });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  getPrivacy: async (req, res) => {
    try {
      const id = req.params.id;
      const party = await Party.findOne({ _id: id });

      if (party.privacy === false) {
        res.json({ err: null, party: party });
      } else {
        const token = req.header("auth-token");
        const user = await getUserByToken(token);

        const userId = user._id.toString();
        const partyUserId = party.userId.toString();
        if (userId == partyUserId) {
          res.json({ err: null, party: party });
        } else {
          res.status(400).json({ err: "Access denied" });
        }
      }
    } catch (err) {
      res.status(400).json({ msg: "Event doesn't exists" });
    }
  },
  update: async (req, res) => {
    const { title, description, partyDate, partyId, partyUserId } = req.body;
    const token = req.header("auth-token");
    let files = [];

    if (req.files) {
      files = req.files.photos;
    }

    if (title == null || description == null || partyDate == null) {
      return res.status(400).json({ error: "Fill the fields" });
    }
    const userByToken = getUserByToken(token);
    const userId = userByToken._id;
    if (userId != partyUserId) {
      return res.status(400).json({ err: "Access denied" });
    }

    const party = {
      id: partyId,
      title: title,
      description: description,
      partyDate: partyDate,
      privacy: req.body.privacy,
      userId: userId,
    };

    let photos = [];
    if (files && files.length > 0) {
      files.forEach((photo, i) => {
        photos[i] = photo.path;
      });
      party.photos = photos;
    }

    try {
      const updatedParty = await Party.findOneAndUpdate(
        { _id: partyId, userId: userId },
        { $set: { party } },
        { new: true }
      );
      res.json({ err: false, party: updatedParty });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  delete: async (req, res) => {
    const token = req.header("auth-token");
    const user = await getUserByToken(token);
    const partyId = req.body.id;
    const userId = user._id.toString();

    try {
      await Party.deleteOne({ _id: partyId, userId: userId });
      res.json({ err: null, msg: "Evento removido com sucesso" });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  multer: upload.fields({ name: "photos" }),
};

module.exports = PartyController;
