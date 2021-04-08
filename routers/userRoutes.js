const express = require("express");
const UserController = require("../controllers/userController");


const api = express.Router();

//user routes
api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);

module.exports = api;
