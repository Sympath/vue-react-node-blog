<template>
  <div class="single-chat">
    <div class="chat-content">
      <div class="chat-header">
        <div class="blogger-name">博主<span>(在线)</span></div>
      </div>
      <div class="chat-body">
        <div class="chat-item" v-for="(item,index) in allMessage" :key="index">
          <div class="chat-item-left" v-if="item.mine ? false : true">
            {{ item.content }}
          </div>
          <div class="chat-item-right" v-else>
            {{ item.content }}
          </div>
        </div>
      </div>
      <div class="chat-bottom">
        <div class="tool-bar">
          <div class="tool-bar-item" v-for="item in toolArr" :key="item.id">
            <img width="15" height="15" :src="item.icon" :alt="item.name" />
            <span>{{ item.name }}</span>
          </div>
        </div>
        <el-input
          class="chat-input"
          type="textarea"
          placeholder="请输入内容"
          v-model="content"
          :autosize="{ minRows: 4, maxRows: 4 }"
          change="sendMessage"
        >
        </el-input>
        <div class="chat-btns">
          <el-button type="warning">清空消息</el-button>
          <el-button type="primary" @click="sendMessage()">发送消息</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import tooldata from "@/localdata/toolbar.json";

export default {
  data() {
    return {
      toolArr: [],
      content: "",
      mineMessage: [],
      friendMessage: [],
      allMessage: [],
    };
  },
  created() {
    // 随机生成用户Id
    this.userId = Date.parse(new Date());
    console.log(this.userId);
    this.toolArr = tooldata.data;
    // 建立连接
    this.connect();

    // 首次加载获取所有消息
    this.initMessage();
  },
  methods: {
    ...mapActions({
      connectSocket: "singleChat/connectSocket",
    }),
    //建立连接
    async connect() {
      this.connectSocket();
    },
    // 发送消息
    sendMessage() {
      this.$store.state.singleChat.socket.emit("sendMessage", {
        userId: this.userId,
        content: this.content,
      });
      this.content = "";
    },
    //首次加载获取消息
    initMessage() {
      this.allMessage = JSON.parse(localStorage.getItem("singleChatMessage"));
    },
  },
  watch: {
    "$store.state.singleChat.message": {
      deep: true,
      handler(obj) {
        // 判断是本人消息还是对方消息,然后放进这次聊天的数组内
        if (obj.userId === this.userId) {
          obj.mine = true;
        } else {
          obj.mine = false;
        }
        // 如果不为null(第一次访问会为null)
        if (localStorage.getItem("singleChatMessage")) {
          const arrhistory = JSON.parse(
            localStorage.getItem("singleChatMessage")
          );
          arrhistory.push(obj);
          localStorage.setItem("singleChatMessage", JSON.stringify(arrhistory));
        } else {
          let arr = [];
          arr.push(obj);
          localStorage.setItem("singleChatMessage", JSON.stringify(arr));
        }

        // 获取localStorage中的所有消息
        this.allMessage = JSON.parse(localStorage.getItem("singleChatMessage"));
      },
    },
  },
};
</script>
<style lang="less" scoped>
.single-chat {
  width: 100%;
  padding: 0;
  margin: 0;
  .chat-content {
    background-color: #f8f9fa;
    width: 60%;
    height: 97vh;
    margin: 0 auto;
    border: 1px solid gainsboro;
    .chat-header {
      width: 100%;
      height: 10%;
      border: 1px solid gainsboro;
      .blogger-name {
        margin: 20px auto;
        min-width: 15%;
        width: 12%;
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        // border: 1px solid #000;
        span {
          font-size: 15px;
          font-weight: normal;
        }
      }
    }
    .chat-body {
      background-color: #fff;
      height: 65%;
      width: 100%;
      .chat-item {
        width: 100%;
        // border: 1px solid #000;
        position: relative;
        height: 40px;
        .chat-item-left {
          width: 40%;
          // border: 1px solid #000;
          left: 0;
          position: absolute;
        }
        .chat-item-right {
          width: 40%;
          // border: 1px solid #000;
          right: 0;
          position: absolute;
          text-align: right;

        }
      }
    }
    .chat-bottom {
      height: 26%;
      .tool-bar {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: flex-start;
        padding: 0 5px;
        box-sizing: border-box;
        .tool-bar-item {
          margin-right: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          span {
            font-size: 10px;
            margin-left: 2px;
          }
        }
      }
      .chat-input {
        height: 55%;
        width: 98.5%;
        background-color: #f8f9fa;
        margin-left: 5px;
      }
      .chat-btns {
        display: flex;
        justify-content: flex-end;
        margin-right: 8px;
      }
    }
  }
}
</style>
