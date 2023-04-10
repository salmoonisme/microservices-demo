const express = require('express');
const router = express.Router();
const admin = require('./adminRoute');

router.use('/', admin);


module.exports = router;