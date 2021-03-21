exports.GITHUB = {
  username: "fujinting",
  oauth_url: "https://github.com/login/oauth/authorize",
  access_token_url: "https://github.com/login/oauth/access_token",
  //获取 github 用户信息 url  eg: https://api.github.com/user?access_token=****&scope=&token_type=bearer
  user_url: "https://api.github.com/user",

  // // 生产环境
  // redirect_url: 'http://codeting.top/login',
  // client_id: '*****',
  // client_secret: '*****',

  // 开发环境
  redirect_url: "http://localhost:3001",
  client_id: "b54aa5bf9517a20d3d39",
  client_secret: "db385413fdbeef4ac66f7629001682f553836467",
};
