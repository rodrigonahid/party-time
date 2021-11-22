const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const app = express();

// app.use(cors);
app.use(express.json());
app.use(express.static("public"));
// Conexao mongodb
// Routes
app.use(routes);
mongoose.connect("mongodb://localhost/partyTime");

app.listen(8000);
