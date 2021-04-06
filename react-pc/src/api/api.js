import request from '../utils/request';


const login = '/user/login'; 
export function userLogin(data) {
  return request({
    url: login,
    method: 'post',
    data: data,
  });
}

const github_login = '/user/githublogin';
export function userGithubLogin(data) {
  return request({
    url: github_login,
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
// 推荐页获取文章列表
const recom_articles ='/user/article/recommend'
export function getArticleRecommendList(query){
  return request({
    url:recom_articles,
    method:'get',
    params:query
  })
}

//获取 技术文章页文章列表
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
// 发送文章评论
const post_comment ='/user/article/comment'
export function postArticleComment(data){
  return request({
    url:post_comment,
    method:'post',
    data:data
  })
}
// 删除某条评论
const delete_comment ='/user/article/comment'
export function deleteArticleComment(query){
  return request({
    url: delete_comment,
    method:'delete',
    params:query
  })
}

// 获取项目列表

const projects ='/user/project/list'
export function getProjectList(query){
  return request({
    url:projects,
    method:'get',
    params:query
  })
}

// 获取关于博主内容

const blogger_infor_content = '/user/blogger/content'; 
export function getBloggerContent(query) {
  return request({
    url: blogger_infor_content,
    method: 'get',
    params: query,
  });
}


// 获取个人网站内容
const about_website_content = '/user/website/content'; 
export function getWebsiteContent(query) {
  return request({
    url: about_website_content,
    method: 'get',
    params: query,
  });
}

// 提交留言

const message = '/user/leave/message'; 
export function postMessage(data) {
  return request({
    url: message,
    method: 'post',
    data: data,
  });
}

// 删除自己的留言

export function deleteMessage(query) {
  return request({
    url: message,
    method: 'delete',
    params: query,
  });
}

// 获取全部留言
export function getMessage(query) {
  return request({
    url: message,
    method: 'get',
    params: query,
  });
}

// 回复留言
const reply_message = '/user/leave/replymessage'; 
export function replyMessage(data){
  return request({
    url: reply_message,
    method: 'post',
    data: data,
  });
}

// 获取友链
const friend_link = '/user/link/list'; 
export function getBloggerFriendLink(query) {
  return request({
    url: friend_link,
    method: 'get',
    params: query,
  });
}