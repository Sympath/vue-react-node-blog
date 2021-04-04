'use strict';

import express from 'express'
import AdminEchart from '../../controller/admin/echart'
const router = express.Router()

// 后台管理系统登录
router.get('/home/echarts', AdminEchart.adminGetEchartData);



export default router
