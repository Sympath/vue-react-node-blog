import request from '../utils/request';


const login = '/user/login'; 
export function userLogin(data) {
  return request({
    url: login,
    method: 'post',
    data: data,
  });
}

const register = '/user/register'; 
export function userRegister(data) {
  return request({
    url: register,
    method: 'post',
    data: data,
  });
}

// 获取侧边栏博主的信息
const blogger_infor = '/user/blogger/information'; 
export function getBloggerInfor(query) {
  return request({
    url: blogger_infor,
    method: 'get',
    params: query,
  });
}
// 获取侧边栏分类数量，文章数量，项目数量
const typ_atr_pro_nums = '/user/dictionary/typeatrpronums'; 
export function getTypeArticleProjectNums() {
  return request({
    url: typ_atr_pro_nums,
    method: 'get'
  });
}

// 获取技术文章页面技术文章列表
const articles ='/user/article/list'
export function getArticleList(query){
  return request({
    url:articles,
    method:'get',
    params:query
  })
}

// 获取具体文章
const article ='/user/article/find'
export function getArticle(query){
  return request({
    url:article,
    method:'get',
    params:query
  })
}
// 阅读量
const read ='/user/article/read'
export function postArticleRead(data){
  return request({
    url:read,
    method:'post',
    data:data
  })
}
// 点赞
const like ='/user/article/like'
export function postArticleLike(data){
  return request({
    url:like,
    method:'post',
    data:data
  })
}
