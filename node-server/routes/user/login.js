'use strict';

import express from 'express'
import UserLoginReset from '../../controller/user/login-reset'
const router = express.Router()

// 前端用户登录
router.post('/login', UserLoginReset.userLogin);
router.post('/register', UserLoginReset.userRegister);
router.post('/githublogin', UserLoginReset.userGithubLogin);

export default router
