const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

//Route to add users
router.post("/add", userController.addUser);

//Route to login in
router.post("/login", userController.loginUser);

module.exports = router;
