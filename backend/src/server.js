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
mongoose.connect("mongodb://localhost/partyTime");
// Routes
app.use(routes);

app.listen(8000);
