import request from '../utils/request';


const login = '/user/login'; 
export function userLogin(data) {
  return request({
    url: login,
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
