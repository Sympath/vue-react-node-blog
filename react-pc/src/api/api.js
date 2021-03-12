import request from '../utils/request';


const login = '/user/login'; 
export function userLogin(data) {
  return request({
    url: login,
    method: 'post',
    data: data,
  });
}