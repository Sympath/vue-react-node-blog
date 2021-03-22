'use strict';

import express from 'express'
import  Website from '../../controller/user/website'
const router = express.Router()

// 前端获取博主信息(只是博主个人信息)
router.get('/website/content', Website.userGetWebsiteContent);


export default router
