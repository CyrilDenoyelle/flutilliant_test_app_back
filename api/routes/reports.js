const express = require("express");

const router = express.Router();

const errorHandler = require("../errorHandler");
const userAuth = require("../middlewares/userAuth");

const {
    create,
} = require("../controllers/reportController");

router.use(userAuth)

// create report
router.route("/create").post(errorHandler(create));


module.exports = router;
