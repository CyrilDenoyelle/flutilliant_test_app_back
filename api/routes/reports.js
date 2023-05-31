const express = require("express");

const router = express.Router();

const errorHandler = require("../errorHandler");
const userAuth = require("../middlewares/userAuth");

const {
    create,
    findAll,
} = require("../controllers/reportController");

router.use(userAuth)

// create report
router.route("/create").post(errorHandler(create));

// find all reports for logged user (director will see all reports, user will see only his reports)
router.route("/").get(errorHandler(findAll));


module.exports = router;
