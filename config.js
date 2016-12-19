/**
 * Created by cong on 2016/12/18.
 */
var Generator = require('./js/g');
var path = require('path');
var wechat_file = path.join(__dirname,'./js/config/wechat_txt');
var util = require('./js/libs/util');

var config = {
    wechat:{
        appID:'wx6389b6489a68b700',
        appSecret:'9485d99152e0a8267371f0c61a0e4e32',
        token:'tcc0228zym',
        getAccessToken:function () {
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken:function (data) {
            data = JSON.stringify(data);
            return util.weriteFileAsync(wechat_file,data);
        }
    }
}

module.exports =config