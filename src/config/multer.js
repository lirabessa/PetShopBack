const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const storaDrive = multer.memoryStorage()

const upload = multer({ storage });

const uploadDrive = multer({storaDrive})

module.exports = {upload, uploadDrive};