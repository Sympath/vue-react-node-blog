import axios from "axios";
import { message } from 'antd';

const service = axios.create({
  baseURL: "http://localhost:3000", //部署上线
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
    } else if (res.status === 212) {
      message.error(res.message);
    }  else if (res.status === 510) {
      message.error(res.message);
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
