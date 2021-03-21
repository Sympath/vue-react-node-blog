// react和vue在创建过程中,会将 process.env.NODE_ENV 初始为一个值, 我们可以在后期进行配置的时候修改这个值
// 生产环境下
const config = {
  oauth_url: "https://github.com/login/oauth/authorize",
  redirect_url: "http://codeting.top/login",
  client_id: "*****",
  client_secret: "*******",
};

// 本地开发环境下
if (process.env.NODE_ENV === "development") {
  config.redirect_url = "http://localhost:3001/#/";
  config.client_id = "b54aa5bf9517a20d3d39";
  config.client_secret = "db385413fdbeef4ac66f7629001682f553836467";
}
export default config;
