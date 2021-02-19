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

// 博文管理,新建 PC以及H5的文章
const article ='/admin/article/create'
export function createArticle(data){
  return request({
    url:article,
    method:'post',
    data:data
  })
}
// 博文管理,修改 PC以及H5的文章
const u_article ='/admin/article/edit'
export function editArticle(data){
  return request({
    url:u_article,
    method:'put',
    data:data
  })
}
// 博文管理,获取 PC以及H5的文章列表
const articles ='/admin/article/list'
export function getArticle(){
  return request({
    url:articles,
    method:'get'
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



