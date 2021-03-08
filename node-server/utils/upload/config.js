const qiniu = require('qiniu')

var accessKey = "uELHnb-VRYlYG-Rw3eh1voDRma2l-uvUPNpDnuyl";
var secretKey = "VuPm-yfQbZLC5cQteoqPGdQtXojSLHLo_tX93x8z";
var bucket = "fujinting"; //存储空间的名字
var url = "www.codeting.top"; //配置的域名
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
  scope: bucket,
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);

module.exports = {
    uploadToken
}