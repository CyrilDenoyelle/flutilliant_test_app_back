const express = require("express");

const router = express.Router();

const errorHandler = require("../errorHandler");

const {
    create,
    login,
} = require("../controllers/userController");

// create user
router.route("/signup").post(errorHandler(create));

// login user
router.route("/login").post(errorHandler(login));


module.exports = router;
