const express = require('express');
const router = express.Router();
var multer = require('multer');
const service = require("./qrCode.service");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '../api/uploadFile');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
var upload = multer({ storage: storage });

router.get('', getList);
router.get('/:id', getData);
router.post("/create", createData);
router.post("/upload", upload.array('images'), uploadData);

function getList(req, res) {
  service.getContactList(req, (error, result) => {
    return error ? res.send(error) : res.send(result);
  });
}

function uploadData(req, res) {
  service.uploadDataFile(req, (error, result) => {
    return error ? res.send(error) : res.send(result);
  });
}

function getData(req, res) {
  service.getContactData(req.params.id, req, (error, result) => {
    return error ? res.send(error) : res.send(result);
  });
}

function createData(req, res) {
  service.createContactData(req, (error, result) => {
    return error ? res.send(error) : res.send(result);
  });
}

module.exports = router;