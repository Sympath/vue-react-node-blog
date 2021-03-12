import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:3000", //部署上线
  timeout: 5000, // 请求超时时间
});

export default service;
