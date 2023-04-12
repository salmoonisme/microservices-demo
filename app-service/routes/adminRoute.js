const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('../middleware/multer');

router.get('/books', adminController.getBooks);
router.get('/books/:id', adminController.getBooksbyID)
router.get('/authors/:id', adminController.getAuthorsbyID)
router.post('/books', multer.single('avatar'), adminController.createBooks);
router.delete('/books/:id', adminController.deleteBooks);

module.exports = router;