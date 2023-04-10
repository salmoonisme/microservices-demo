const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers')

router.get('/books', adminController.get);

module.exports = router;