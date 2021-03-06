"use strict";

import express from "express";
import Message from "../../controller/user/message";

const router = express.Router();

// 前端留言

router.post("/leave/message", Message.userPostMessage);
router.get("/leave/message", Message.userGetMessage);
router.delete("/leave/message", Message.userDeleteMessage);
router.post("/leave/replymessage", Message.userReplyMessage);





export default router;
