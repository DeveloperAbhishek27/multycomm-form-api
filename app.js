const express = require("express");
const cors = require("cors");
require("dotenv").config();
const formRoutes = require("./src/routes/formRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/form", formRoutes);

module.exports = app;
