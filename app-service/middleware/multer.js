const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Error } = require('./response');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1048576 },
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error(400, 'Only images are allowed'));
    }
    cb(null, true);
  },
});

module.exports = upload;
