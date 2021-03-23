// 引入model层
import MessageInformation from "../../models/message-information";
import UserInformation from "../../models/user-information";

class Message {
  // 创建留言
  async userPostMessage(req, res) {
    const { userId, message_txt, message_time } = req.body;
    try {
      const user = await UserInformation.findById(userId);
      const infor = await MessageInformation.create({
        user_id: userId,
        nackname: user.nackname,
        user_avatar: user.user_avatar,
        message_txt: message_txt,
        message_time: message_time,
      });
      res.send({
        message: "留言成功!",
      });
    } catch (error) {}
  }
  // 删除留言
  async userDeleteMessage(req, res) {
    const { user_id, id } = req.query;
    try {
      const message = await MessageInformation.findById(id);
      if (message.user_id === user_id) {
        const result = await MessageInformation.findByIdAndDelete(id);
        res.send({
          message: "删除成功！",
        });
      } else {
        res.send({
          status: 231,
          message: "您没有权限删除！",
        });
      }
    } catch (error) {}
  }

  // 获取留言
  async userGetMessage(req, res) {
    try {
      const messages = await MessageInformation.find();
      res.send(messages.reverse());
    } catch (error) {}
  }

  // 回复留言
  async userReplyMessage(req, res) {
    const {
      id, //评论id
      user_id,
      secend_message_txt,
      secend_create_time,
      nackname,
      content
    }= req.body
    try {
      const Message = await MessageInformation.findById(id);
      const user = await UserInformation.findById(user_id);
      console.log(Message);
      Message.second_message.push({
        user_id:user_id, //二级评论人的userid
        nackname:user.nackname, //二级评论人的昵称
        first_nackname:nackname, //一级评论人的昵称
        last_content:content,
        secend_message_txt:secend_message_txt, //二级评论人的评论
        secend_create_time:secend_create_time //二级评论人的评论时间
      })
      const new_message = await MessageInformation.findByIdAndUpdate(id,{
        second_message: Message.second_message
      })
      res.send({
        message:'回复成功'
      })
    } catch (error) {}
  }
}

export default new Message();
