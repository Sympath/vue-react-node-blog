'use strict';

import express from 'express'
import BloggerInfor from '../../controller/user/blogger'
const router = express.Router()

// 前端获取博主信息(只是博主个人信息)
router.get('/blogger/information', BloggerInfor.userGetBloggerInfor);
router.get('/blogger/content', BloggerInfor.userGetBloggerContent);


export default router
