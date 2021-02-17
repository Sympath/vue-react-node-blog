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