// 引入加密
import bcrypt from "bcryptjs";

// 引入生成token
import jwt from "jsonwebtoken";

// 引入全局配置的github信息(github授权登录那一块)
const CONFIG = require('../../utils/github/config');

// 引入node-fetch,使本机想github服务器发起请求
import fetch from "node-fetch";

// 引入model层
import UserInformation from "../../models/user-information";

class UserLoginReset {
  //  用户登录
  async userLogin(req, res) {
    const { account, password } = req.body;
    // 验证此用户是否存在
    try {
      const user = await UserInformation.findOne({ account }).select(
        "+password"
      );
      if (!user) {
        res.send({
          status: 210,
          type: "ERROR_ACCOUNT",
          message: "不存在此用户",
        });
      }

      //验证用户密码是否正确
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        res.send({
          status: 211,
          type: "ERROR_ACCOUNT",
          message: "密码错误",
        });
      } else {
        // 账号密码都正确时,返回成功和token
        const userToken = jwt.sign({ id: user._id }, req.app.get("secret"));
        res.send({
          status: 200,
          token: userToken,
          message: "登录成功!",
          user_id:user._id,
          nackname:user.nackname
        });
      }
    } catch (error) {}
  }

  // 用户注册
  async userRegister(req, res) {
    const { account, password, nackname } = req.body;
    const user = await UserInformation.findOne({ account });
    var first_name = [
      // 40个
      "可爱的",
      "温柔的",
      "内向的",
      "腼腆的",
      "害羞的",
      "多疑的",
      "直率的",
      "活泼的",
      "开朗的",
      "滑稽的",
      "可笑的",
      "古怪的",
      "怪异的",
      "狭窄的",
      "宽容的",
      "猜忌的",
      "多情的",
      "冷淡的",
      "热情的",
      "脸红的",
      "拘谨的",
      "谨慎的",
      "严格的",
      "严厉的",
      "无情的",
      "懦弱的",
      "怯弱的",
      "飘逸的",
      "圣洁的",
      "纯洁的",
      "清纯的",
      "贤慧的",
      "慈爱的",
      "仁慈的",
      "老实的",
      "木讷的",
      "慷慨的",
      "大方的",
      "贪玩的",
      "暴躁的",
    ];
    var last_name = [
      "孙悟空",
      "猪八戒",
      "唐僧",
      "沙和尚",
      "哪咤",
      "牛魔王",
      "六耳猕猴",
      "红孩儿",
      "二郎神",
      "镇元大仙",
      "菩提老祖",
      "小白龙",
      "二郎神",
      "金角大王",
      "银角大王",
      "白骨精",
      "铁扇公主",
      "太上老君",
      "狐狸精",
      "哮天犬",
      "托塔天王",
      "巨灵神",
      "如来佛祖",
      "东海龙王",
      "西海龙王",
      "北海龙王",
      "南海龙王",
      "小旋风",
      "李世民",
      "高翠兰",
      "西凉国女王",
      "赤尻马猴芭将军",
      "嫦娥",
      "玉帝",
      "王母",
      "雷公",
      "电母",
      "赤脚大仙",
      "奔波儿灞",
      "灞波儿奔",
    ];
    if (user) {
      res.send({
        status: 213,
        type: "ERROR_ACCOUNT",
        message: "该用户已存在!",
      });
    } else {
      if (nackname == "") {
        req.body.nackname =
          first_name[Math.floor(Math.random() * 40)] +
          last_name[Math.floor(Math.random() * 40)];
      }
      const adminer = await UserInformation.create(req.body);
      res.send({
        message: "注册成功!",
      });
    }
  }
  // github登录
  async userGithubLogin(req, res) {
      const code = req.body.code;
      if(!code){
        res.send({
          message:'code缺失,请联系开发者',
          status:411
        })
        return false;
      }

      //初始化一些值，准备向github服务器发起验证请求了 
      const verify_path = CONFIG.GITHUB.access_token_url;
      const infor_path = CONFIG.GITHUB.user_url;
      let access_token= '';
      const body = {
        client_id: CONFIG.GITHUB.client_id,
        client_secret: CONFIG.GITHUB.client_secret,
        code: code,
      };
     
      
      // fetch node端使用fetch, 和github验证服务器进行交互
     await fetch(verify_path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(body),
      })
        .then(result => {
          return result.text();
      }).then(body => {
        console.log("body:",body);
        const args = body.split('&');
        const arg = args[0].split('=');
        access_token = arg[1];
      
      })

      // 初始化一些值
        console.log(access_token,555555);
        await fetch(infor_path,{
          headers: { 'Authorization': 'token '+ access_token},
        })
        .then(result1 => {
          console.log('res1:', result1);
          return result1.json();
        })
        .then(response => {
         console.log(response,'44444444444444');
        })
       
      
      
  }
}

export default new UserLoginReset();
