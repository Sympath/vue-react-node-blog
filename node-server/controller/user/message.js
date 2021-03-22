// 引入model层
import MessageInformation from "../../models/message-information";
import UserInformation from "../../models/user-information";


class Message {
  // 创建留言
  async userPostMessage(req, res) {
      const {userId,message_txt,message_time} = req.body
    try {
      const user = await UserInformation.findById(userId);
      const infor = await MessageInformation.create({
          user_id:userId,
          nackname:user.nackname,
          user_avatar:user.user_avatar,
          message_txt:message_txt,
          message_time:message_time
      });
      res.send({
        message: "留言成功!",
      });
    } catch (error) {}
  }
  
  // 获取留言
  async userGetMessage(req, res) {
    try {
      const messages = await MessageInformation.find();
      res.send(messages);
    } catch (error) {}
    
  }


}

export default new Message();
