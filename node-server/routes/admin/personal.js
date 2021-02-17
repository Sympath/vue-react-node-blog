'use strict';

import express from 'express'
import Personal from '../../controller/admin/persional'
const router = express.Router()

// 后台管理系统(个人信息,获取PC以及H5的博主个人信息)
router.get('/personal/information', Personal.adminGetBloggerInfor);


export default router
