const { connect } = require("http2");

var app = require("express")();
var http = require("http").Server(app);
// 防止跨域问题
var io = require("socket.io")(http, { cors: true });

var connections = [];

// 用户建立连接
io.on("connect", function (socket) {
  connections.push(socket);
  console.log('连接建立！');

  // 用户发送消息,服务端监听并回复
  socket.on("sendMessage", function (data) {
    io.emit("newMessage", data);
    console.log(data);
  });

});

http.listen(3000, function () {
  console.log("listening on *:3000");
});
