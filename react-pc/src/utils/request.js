import axios from "axios";
import { message } from 'antd';

const service = axios.create({
  baseURL: "http://localhost:3000", //本地
  // baseURL: "http://172.28.75.196:3000", //局域网
  timeout: 5000, // 请求超时时间
});

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log(response.status);
    if (res.status === 210) {
      message.warning(res.message);
      return Promise.reject("error");
    } else if (res.status === 211) {
      message.error(res.message);
      return Promise.reject("error");
    } else if (res.status === 212) {
      message.error(res.message);
      return Promise.reject("error");
    } else if (res.status === 213) {
      message.error(res.message);
      return Promise.reject("error");
    } else if (res.status === 221) {
      message.error(res.message);
      return Promise.reject("error");
    }else if (res.status === 231) { //无权删除留言
      message.error(res.message);
      return Promise.reject("error");
    }else if (res.status === 411) {
      message.error(res.message);
      return Promise.reject("error");
    } else if (res.status === 510) {
      message.error(res.message);
      return Promise.reject("error");
    }else {
      return response;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    message({
      message: "连接超时（后台不能连接，请联系系统管理员）",
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);



export default service;
