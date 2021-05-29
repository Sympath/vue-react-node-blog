// 七牛云图片存储封装
var express = require("express");
const router = express.Router();
var qiniu = require("qiniu");
const multer = require("multer");
const { uploadFileToQiniu } = require("./qiniuUtil");

// 必选项 不然拿不到buffer
var storage = multer.memoryStorage();
var uploads = multer({ storage: storage });

router.post("", uploads.single("file"), function (req, res, next) {
  // 图片数据流
  var imgData = req.file;
  uploadFileToQiniu(imgData.originalname, imgData.buffer)
    .then(({ key }) => {
      res.send({ imgUrl: key });
    })
    .catch((err) => {
      console.log(err);
      console.log("问题");
      res.send({
        message: "图片上传失败",
        status: 510,
      });
    });
});
module.exports = router;
