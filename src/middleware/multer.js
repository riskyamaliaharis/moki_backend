const multer = require("multer");
const helper = require("../helper/response");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("File must be jpg or png"));
  }
};

const limits = {
  files: 1,
  fileSize: 1024 * 1024,
};

const upload = multer({ storage, fileFilter, limits }).single("image_src");

const uploadFilter = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return helper.response(res, 400, err.message);
    } else if (err) {
      return helper.response(res, 400, err.message);
    }
    next();
  });
};

module.exports = uploadFilter;
