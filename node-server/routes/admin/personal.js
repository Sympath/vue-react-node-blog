"use strict";

import express from "express";
import Personal from "../../controller/admin/persional";

const router = express.Router();
const multer = require("multer");


// 后台管理系统(图片上传方法)
const upload = multer({ dest: __dirname + "/../../upload/admin" });
router.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  file.url = `http://localhost:3000/upload/admin/${file.filename}`;
  res.send(file);
});



// 后台管理系统(个人信息,获取PC以及H5的博主个人信息)
router.get("/personal/information", Personal.adminGetBloggerInfor);
router.post("/personal/information", Personal.adminEditBloggerInfor);


export default router;
