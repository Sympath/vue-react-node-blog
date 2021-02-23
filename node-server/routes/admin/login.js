'use strict';

import express from 'express'
import AdminLoginReset from '../../controller/admin/login-reset'
const router = express.Router()

// 后台管理系统登录
router.post('/login', AdminLoginReset.adminLogin);
router.post('/register', AdminLoginReset.adminRegister);
router.put('/reset', AdminLoginReset.adminReset);


export default router
