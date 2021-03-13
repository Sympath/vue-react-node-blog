'use strict';

import express from 'express'
import Dictionary from '../../controller/user/dictionary'
const router = express.Router()

// 字典值，一些不系统的接口，比如获取文章数量，文章分类数量，项目数量，三不管的那种
router.get('/dictionary/typeatrpronums', Dictionary.userGetCateArticleProjectNums);


export default router
