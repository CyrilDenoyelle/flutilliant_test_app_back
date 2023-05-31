const express = require("express");

const router = express.Router();

const usersRouter = require('./users');
const reportsRouter = require('./reports');

router.use('/users', usersRouter);
router.use('/reports', reportsRouter);

module.exports = router;
