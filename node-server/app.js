const express=require("express")
const app = express();

app.use(require('cors')())  

//处理post请求,解析json数据
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// jsonwebtoken生成token
app.set('secret','vuereactnodeblog')



require('./mongodb/db')(app)


import router from './routes/index.js';
router(app)

app.listen(3000,()=>{
    console.log( 'App Listening on port 3000');
})
