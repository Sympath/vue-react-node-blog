import io from "socket.io-client";
import types from "./type";

export default {
  async connectSocket({ commit }) {
    //在state中初始化了socket为null，这里我们给他赋值
    // let socket = io.connect("http://localhost:3000");
    let socket = io.connect("http://172.28.74.16:3000");

    //建立连接
    socket.on("connect", async () => {
      console.log("连接成功");

      // 连接成功后，我们将这个socket保存在state中,这个时候，我们在mutations中将state中(socket为null)重新赋值
      commit(types.SET_SOCKET, socket);
    });

    //监听消息
    socket.on("newMessage", (res) => {
      console.log("消息来了", res);
      if (res) {
        commit(types.SET_MESSAGE, res);
      } else {
        console.log("有问题");
      }
    });
  },
};
