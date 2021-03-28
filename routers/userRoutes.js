const express = require("express");
const UserController = require("../controllers/userController");


const api = express.Router();

//user routes
api.post("/sign-up", UserController.signUp);

module.exports = api;
