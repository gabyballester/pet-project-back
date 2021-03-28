const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { API_VERSION } = require("./config");

// Load routings
const userRoutes = require("./routers/userRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Header HTTP (CORS)

// Router Basic
app.use(`/api/${API_VERSION}/user`, userRoutes);

module.exports = app;