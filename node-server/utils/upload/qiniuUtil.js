const qiniu = require("qiniu");
const qnconfig = require("./config.js");
const { uploadToken } = qnconfig;

function uploadFileToQiniu(key = "test.txt", content = "hello world") {
  return new Promise((res, rej) => {
    var config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone.zone2;

    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    formUploader.put(
      uploadToken,
      key,
      content,
      putExtra,
      function (respErr, respBody, respInfo) {
        if (respErr) {
          throw respErr;
        }
        
        if (respInfo.statusCode == 200) {
          res(respBody);
          console.log(respErr, respBody, respInfo,'七牛云成功');
        } else {
          console.log(respErr, respBody, respInfo,'七牛云失败');
          rej({
            status: respInfo.statusCode,
            body: respBody,
          });
        }
      }
    );
  });
}

module.exports = {
  uploadFileToQiniu,
};
