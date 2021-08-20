const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 1e9)}${path
      .extname(file.originalname)
      .toLowerCase()}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage }).single("img");

module.exports = upload;
