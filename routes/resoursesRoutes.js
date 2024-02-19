const express = require("express");
const router = express.Router();

// const checkAuth = require("../middleware/check-auth");
const multer = require("multer");
const streamifier = require("streamifier");
const authService = require("../services/locationService");

const fileUpload = multer();
const cloudinary = require("cloudinary").v2; // not secure this only for testing
cloudinary.config({
  cloud_name: "ddr7izjrv", // not secure this only for testing
  api_key: "563916525617322",
  api_secret: "MUb9hoBlYHBoVfK8m-eEu3YI3Ds",
});
router.route("/").post(fileUpload.single("image"), function (req, res, next) {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };
  async function upload(req) {
    let result = await streamUpload(req);
    return result;
  }

  upload(req)
    .then((data) => {
      console.log(data);
      res.status(201).json({
        url: data.url,
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
