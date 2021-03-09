import request from '../utils/request';


// 登录
const login = '/admin/login'; 
export function adminLogin(data) {
  return request({
    url: login,
    method: 'post',
    data: data,
  });
}

// 图片上传七牛云
const uploadImg = 'upload'
export function uploadImage(data){
  return request({
    url: uploadImg,
    method: 'post',
    data: data,
  });
}

// 个人信息,获取PC以及H5的博主个人信息
const blogger_infor ='/admin/personal/information'
export function getBloggerInformation(query){
  return request({
    url:blogger_infor,
    method:'get',
    params:query
  })
}

// 个人信息,建立(修改)PC以及H5的博主个人信息
export function postBloggerInformation(data){
  return request({
    url:blogger_infor,
    method:'post',
    data:data
  })
}

// 个人标签,建立(修改/删除)PC以及H5的博主个人标签
const blogger_label ='/admin/personal/label'
export function postBloggerLabel(data){
  return request({
    url:blogger_label,
    method:'post',
    data:data
  })
}
// 个人标签,获取 PC以及H5的博主个人标签
export function getBloggerLabel(){
  return request({
    url:blogger_label,
    method:'get'
  })
}

// 个人经历,建立(修改/删除)PC以及H5的博主个人经历
const blogger_experience ='/admin/personal/experience'
export function postBloggerExperience(data){
  return request({
    url:blogger_experience,
    method:'post',
    data:data
  })
}
// 个人经历,建立(修改/删除)PC以及H5的博主个人经历

export function getBloggerExperience(){
  return request({
    url:blogger_experience,
    method:'get'
  })
}


// 公告管理,建立(修改/删除)PC以及H5的公告
const publish_notice ='/admin/publish/notice'
export function postPublishNotice(data){
  return request({
    url:publish_notice,
    method:'post',
    data:data
  })
}
// 公告管理,获取PC以及H5的公告
export function getPublishNotice(){
  return request({
    url:publish_notice,
    method:'get'
  })
}

// *********************************************文章类型****************************************************
// 博文管理,新建(修改/删除) PC以及H5的文章类型
const article_type ='/admin/article/type'
export function postArticleType(data){
  return request({
    url:article_type,
    method:'post',
    data:data
  })
}

// 博文管理,获取(修改/删除) PC以及H5的文章类型
export function getArticleType(){
  return request({
    url:article_type,
    method:'get'
  })
}
// *********************************************文章管理****************************************************

// 博文管理,新建 PC以及H5的文章
const c_article ='/admin/article/create'
export function createArticle(data){
  return request({
    url:c_article,
    method:'post',
    data:data
  })
}
// 博文管理,获取 PC以及H5的指定文章
const article ='/admin/article/find'
export function getArticle(query){
  return request({
    url:article,
    method:'get',
    params:query
  })
}

// 博文管理,获取 PC以及H5的最近的一篇文章(最后一篇文章)
const recent_article ='/admin/article/recent'
export function getRecentArticle(){
  return request({
    url:recent_article,
    method:'get'
  })
}

// 博文管理,修改 PC以及H5的指定文章
const u_article ='/admin/article/edit'
export function editArticle(data){
  return request({
    url:u_article,
    method:'put',
    data:data
  })
}
// 博文管理,获取 PC以及H5的文章列表(包括条件查询)
const articles ='/admin/article/list'
export function getArticleList(query){
  return request({
    url:articles,
    method:'get',
    params:query
  })
}

// 博文管理,删除PC以及H5的指定文章
const d_article ='/admin/article/delete'
export function deleteArticle(query){
  return request({
    url:d_article,
    method:'delete',
    params:query
  })
}
// *********************************************项目管理****************************************************
// 项目管理,新建 PC以及H5的项目
const c_project ='/admin/project/create'
export function createProject(data){
  return request({
    url:c_project,
    method:'post',
    data:data
  })
}
// 项目管理,获取 PC以及H5的指定的项目
const project ='/admin/project/find'
export function getProject(query){
  return request({
    url:project,
    method:'get',
    params:query
  })
}
// 项目管理,获取 PC以及H5的最近的一个项目(最后一个项目)
const recent_project ='/admin/project/recent'
export function getRecentProject(){
  return request({
    url:recent_project,
    method:'get'
  })
}
// 项目管理,修改 PC以及H5的指定项目
const u_project ='/admin/project/edit'
export function editProject(data){
  return request({
    url:u_project,
    method:'put',
    data:data
  })
}
// 项目管理,获取 PC以及H5的项目列表(包括条件查询)
const projects ='/admin/project/list'
export function getProjectList(query){
  return request({
    url:projects,
    method:'get',
    params:query
  })
}

// 项目管理,删除PC以及H5的指定项目
const d_project ='/admin/project/delete'
export function deleteProject(query){
  return request({
    url:d_project,
    method:'delete',
    params:query
  })
}


// 友链管理,获取全部友链
const links ='/admin/link/list'
export function getLinkList(query){
  return request({
    url:links,
    method:'get',
    params:query
  })
}
// 友链管理,创建友链
const c_link ='/admin/link/create'
export function createLink(data){
  return request({
    url:c_link,
    method:'post',
    data:data
  })
}
// 友链管理,删除友链
const d_link ='/admin/link/delete'
export function deleteLink(query){
  return request({
    url:d_link,
    method:'delete',
    params:query
  })
}
// 友链管理,编辑友链
const e_link ='/admin/link/edit'
export function editLink(data){
  return request({
    url:e_link,
    method:'put',
    data:data
  })
}

// 后台管理，密码重置
const reset = '/admin/reset'; 
export function adminReset(data) {
  return request({
    url: reset,
    method: 'put',
    data: data,
  });
}
// 后台管理，注册管理员

const register = '/admin/register'; 
export function adminRegister(data) {
  return request({
    url: register,
    method: 'post',
    data: data,
  });
}




