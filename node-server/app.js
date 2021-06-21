const express = require("express");
const app = express();

app.use(require("cors")());

//处理post请求,解析json数据
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// jsonwebtoken生成token
app.set("secret", "vuereactnodeblog");

// 引入mongoose
require("./mongodb/db")(app);

// 引入路由
import router from "./routes/index.js";
router(app);

// 监听3000端口
app.listen(3000, () => {
  console.log("App Listening on port 3000");
});
