'use strict';

import express from 'express'
import UserLogin from '../../user/admin/login'
const router = express.Router()

// 后台管理系统登录
router.post('/login', UserLogin.adminLogin);

export default router
