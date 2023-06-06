const express = require('express');

const router = express.Router();

const errorHandler = require('../errorHandler');
const userAuth = require('../middlewares/userAuth');

const {
    create,
    findAll,
    update,
} = require('../controllers/reportController');

router.use(userAuth);

// create report
router.route('/').post(errorHandler(create));

// find all reports for logged user (director will see all reports, user will see only his reports)
router.route('/').get(errorHandler(findAll));

// update a report for logged user
// (director will be able to update any reports, user only his own reports)
router.route('/').put(errorHandler(update));

module.exports = router;
